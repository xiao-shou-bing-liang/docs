---
date: 2026-03-30
---

# Meeting Notes

# Summary of the Sharing Session on Hands-on Practice and Adoption of AI Coding Tools

This meeting revolved around **the hands-on adoption of AI coding tools, productivity-boosting methods, pitfall experiences, team collaboration standards, and industry awareness**. Combining his own first-line hands-on experience, the speaker gave a complete walkthrough of the full-process AI coding workflow, from single-requirement development to multiple concurrent tasks. Participants then exchanged and discussed tool usage, risk control, adoption difficulties, and other issues. The core content is summarized below:

## 1. Core AI Coding Tools and Basic Configuration Standards

1. **Coverage of main tools**: The session focused on mainstream AI coding tools such as Codex (including its companion VS Code extension), Continue, and Copilot, and also covered supporting productivity tools such as the OpenHands task management tool, MCP protocol extension tools, and AI model relay management tools.
2. **Key points of basic configuration**
    - Tools can be installed from the command line, and the VS Code extension can share one set of configuration with the command line. The configuration file is stored in the system home directory by default, and the core parameters to configure are the model API Key, request endpoint, proxy, and so on.
    - One-click project initialization is supported: a built-in command automatically scans project dependencies and the tech stack (such as the Java version and Spring Boot version) and automatically generates a basic project overview, with no need to manually tell the AI everything about the project.
    - Project development constraints are customizable: in the fixed project files that the AI reads by default, you can add coding standards (such as a UTF-8 encoding requirement), unit test templates, tech stack version constraints, business development rules, and so on, to ensure that AI-generated code always conforms to project standards and to avoid restating requirements.

## 2. Standard Single-Threaded AI Development Workflow (Single Requirement / Single Bug Fix)

The speaker laid out a practical, low-risk full AI development process for single-task scenarios. The core steps are as follows:

1. **Provide precise requirements and context**: Give the AI precise boundary information first (such as the target file path, build script, core interface code, and business background) rather than the entire project code, which both avoids wasting model context and reduces the AI's misunderstandings.
2. **Prefer plan mode**: Do not directly use auto mode to let the AI modify code. Instead, first use plan mode to have the AI output a step-by-step to-do plan, have a human confirm that the scope of changes, technology choices, and execution logic in the plan are correct, and then let the AI carry out the code changes, thereby avoiding unbounded AI changes and deviations from business logic at the source.
3. **Iterative modification and a closed verification loop**: After the AI finishes the code changes, a human must complete the build, functional testing, and code review; if errors, logic mismatches, or other problems appear, the error information can be fed directly back to the AI so it can iterate and fix them until the functionality meets expectations.
4. **Persisting context and committing code**: After a requirement is completed, update the changes and business logic into the project's AI context documents so that subsequent AI calls use the latest project information; once a single requirement passes verification, commit it separately and immediately, and strictly avoid mixing multiple requirements or multiple bug fixes into one commit, which makes later troubleshooting and rollback easier.

## 3. Multi-Threaded Concurrent Development: The Core Productivity Gain of AI Coding

1. **Core pain point**: In single-window, single-threaded development, the efficiency gain from AI is limited; when multiple requirements are developed in parallel, it is very easy for multiple AIs to modify the same file, leading to code conflicts, tangled logic, and reviews that are hard to perform.
2. **Solution: isolated development based on Worksheet (workspace)**
    - Implementation principle: Similar to Git branches, a dedicated workspace is created for each independent requirement/task, and the tool automatically copies the complete project files into a separate directory, so that code changes for different tasks are completely isolated and do not affect each other.
    - Standard workflow: First split out multiple independent requirements with clear boundaries, create a separate workspace for each requirement, and start multiple AIs to develop in parallel at the same time; after the task in a single workspace is completed and verified, merge it back into the main branch as an independent branch, and complete the final verification after a human resolves the conflicts.
3. **Key insight**: The core productivity gain of AI coding is not the speed of code generation for a single requirement, but the concurrent development of multiple tasks through workspaces, which multiplies R&D capacity; once concurrent development is in place, the core bottleneck of R&D will shift from writing code to the efficiency of code review and test verification.

## 4. Model Selection, Cost Control, and Configuration Management

1. **Comparison of model performance**
    - Overseas models (such as the GPT series): stronger in code generation, business logic understanding, and complex bug fixing, with a lower probability of mistakes; these are the speaker's main models.
    - Domestic models (such as MiniMax and Doubao): can handle simple problems and single-scenario development requirements, but their ability in complex business logic and full-process code modification is weaker than that of overseas models, and some complex scenarios cannot be satisfied.
2. **Cost and token control**
    - Cost situation: the average cost of a single bug fix or single requirement change is about 2-3 yuan; the vaguer the context and the more files scanned, the higher the token consumption and the higher the cost. Official GPT model pricing is about 5 USD per million tokens, and relay channels are cheaper.
    - Core cost-reduction methods: precisely control the context fed to the AI, providing only the necessary business and technical information and avoiding full project scans; locate requirements precisely through file paths and code snippets first, to reduce ineffective token consumption.
3. **Convenient configuration tools**
    - Model relay management tools: can centrally manage the API Keys and request endpoints of multiple model providers, and support graphical one-click model switching, load balancing, and failover, avoiding frequent manual edits to configuration files while also solving the problem of unstable single relay channels.
    - Companion extensions: such as the AI chat models extension for VS Code, which can integrate multiple mainstream models, be accessed without a VPN, and also improve access speed.

## 5. Pitfall Experience, Risk Control, and Pitfall-Avoidance Guide

### (1) Common Usage Pitfalls and Countermeasures

1. **Code errors caused by insufficient context**: The AI generates wrong code (such as wrong configuration paths or tampered functional logic) because it lacks key information such as namespaces, business logic, and technical constraints. Countermeasure: give the AI sufficient core context in advance, and clarify the business boundaries and technical constraints.
2. **Unbounded modification of existing logic**: Even if a prompt such as "do not change the existing logic" is added, when auto mode is used directly, the AI may still modify the existing business code on its own and delete necessary logic, causing the functionality to fail. Countermeasure: mandate the use of plan mode, confirm the scope of changes and the approach first, and then carry out the code changes.
3. **Context overflow leading to lower accuracy**: Once the model's context usage exceeds 50%, the accuracy of generated code drops significantly. Countermeasure: open a new window in time, persist the core context into project files, and let the AI read it again before continuing development.
4. **Code conflicts in concurrent development**: Parallel multi-task work is not isolated, so multiple AIs modify the same file, making the code messy and hard to review. Countermeasure: All parallel requirements must be isolated through workspaces, and multiple AIs modifying files under the same project directory at the same time is prohibited.

### (2) Data Security and Classified-Information Risk Control

1. Core risk: AI models have extremely strong contextual reasoning capabilities, so even desensitized code and documents may allow the AI to restore classified information and infer business scenarios, posing a serious risk of data leaks.
2. Countermeasure: For classified projects, uploading full code or project files is strictly prohibited; only single functions or single code snippets may be processed. Prefer intranet-deployed and compliant model services, and strictly control the outflow of classified information.

## 6. Recommendations for Team Collaboration Standards

To avoid problems such as chaotic project standards, inconsistent code styles, and scattered context during multi-person collaboration, the speaker proposed 3 core standardization recommendations:

1. Unify the project AI configuration file: Fix the name of the project standards file that the AI reads by default within the team, and prohibit multiple people from using different tools and different configuration files, ensuring that all AI-generated code follows the same set of project rules.
2. Unify the context persistence standard: Set up a dedicated AI directory under the project's docs directory to centrally store project development standards, business context, skill documents, and so on, forming a shared team AI knowledge base and avoiding prompts being scattered in personal chat windows.
3. Unify the development workflow: Align the team on the standard AI development process of "plan confirmation - code execution - test verification - separate commit - context persistence" to reduce the cost of team collaboration.

## 7. Industry Awareness and the Transformation of Programmer Capabilities

1. Core industry trend: AI is already able to efficiently complete repetitive, boilerplate code writing, the value of pure coding ability keeps declining, and code itself is no longer a programmer's core competitiveness.
2. Directions for the transformation of programmers' core capabilities
    - Top-level design and architecture ability: doing a good job of the top-level design of business processes and system architecture is the core of avoiding messy code and bloated business logic, and it is also a core capability that AI cannot replace.
    - Code review and quality judgment ability: being able to accurately judge whether AI-generated code is good or bad, whether the logic is reasonable, and what potential hidden risks exist is the foundational ability for using AI well.
    - Requirement decomposition and decision-making ability: being able to decompose complex business requirements into step-by-step tasks that AI can execute, and to make correct decisions and adjustments regarding the approaches and plans the AI provides.
    - Problem troubleshooting and verification ability: testing, verification, and troubleshooting after AI generates code are core steps that AI currently cannot fully replace, and they are also the core bottleneck of the R&D process.
3. Learning and adoption advice: The whole industry is on the same starting line with AI coding, and it is a normal part of the learning process to see efficiency drop rather than rise when first using it; do not be stingy about trying different models and tools, and through hands-on practice and pitfalls build a workflow that suits you and your team, which in the long run will deliver exponential improvements in R&D efficiency.

## Meeting Wrap-up

Participants exchanged views on their own pitfall experiences with AI tools, their impressions of the models, the risks of using them on classified projects, the adoption of AI for frontend style adjustments, and other issues. The core consensus was: adopting AI coding requires continuous hands-on practice, encountering pitfalls, and establishing standards, and the team should strengthen the exchange and sharing of relevant experience going forward, so as to jointly improve the standard workflow for AI-driven R&D.
