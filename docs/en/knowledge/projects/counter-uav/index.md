---
date: 2026-11-02
title: Counter-UAV Frontend
---

# Counter-UAV Frontend

This article records the Web frontend development work I was responsible for on this project. The backend sensing, recognition, and algorithm parts were outside my scope, so they are not covered here.

## 1. Project Overview

The project is a UAV detection and countermeasure platform for low-altitude security. Its business chain consists of four stages: detection and discovery, recognition and localization, alerting and warning, and countermeasure response.

The frontend has three responsibilities in this system:

1. Real-time situational display. Continuously refresh UAV tracks and the positions of reconnaissance units and jamming units on the map, and output spectrum diagrams, rain graphs, and direction-finding results.
2. Target handling operations. Operators select targets on the map, configure strategies and parameters, and issue jamming commands.
3. System configuration management. Provide backend pages such as data management, device management, and system settings.

## 2. My Responsibilities and Involvement

I joined the project on April 28, 2026, and finished on July 24, 2026, responsible for the Web frontend. When I took over, the frontend had only a basic scaffold and the main pages had not yet been built.

My specific scope included: building the data management module from scratch, implementing the internationalization solution, main map real-time interaction, the strategy and handling workflow, the system self-check panel, situational replay, login and permissions, and refactoring the API layer.

The repository has 605 commits in total, of which I authored 133; excluding merge commits that is 110, touching 121 files.

## 3. Tech Stack

| Category | Choice | Version |
| --- | --- | --- |
| Framework | React + Umi | 18 / 4 |
| UI components | Ant Design | 4.24.16 |
| Map | OpenLayers | 10.6.1 |
| Real-time communication | socket.io-client | 2.2.0 |
| Charts | ECharts | 5.5.1 |
| Coordinate conversion | coordtransform | 2.1.2 |
| Utility libraries | ahooks, lodash | 3.8.4 / 4.17 |
| Runtime | Node (pinned by Volta) | 18.20.8 |

It is worth noting that the socket.io client is pinned to 2.2.0 rather than the currently common 4.x; upgrading would cause protocol incompatibility with the server.

## 4. Specific Work

### 4.1 Data Management Module (Built from Scratch)

When I took over, this directory was empty. I built it module by module and ultimately delivered 13 functional pages.

| Module | Main Capabilities |
| --- | --- |
| User management | User CRUD, password reset, button-level permission control |
| Role management | Role list, permission assignment |
| Operation logs | Paginated queries, details, export, clear |
| System logs | Paginated queries, download, clear |
| Target history | Query, export, single delete, batch delete, clear |
| Aircraft model library | Aircraft model CRUD, batch import and export, template download |
| Database management | Backup, restore, single-database backup, drag-and-drop SQL upload |
| System settings | System time and time synchronization, device location, operation mode, signal thresholds, compass calibration, LoRa channel configuration |
| Situational replay | Map playback, target history replay |
| Spectrum playback | Playback file management and playback dialog |
| IQ acquisition | Start and stop acquisition, download, delete, IQ playback |
| Unattended operation | Frequency band template configuration, direction and handling-method bitmask mapping |
| Navigation menu | Left-side navigation of the data management module |

Three structural cleanups were carried out along the way:

First, a unified search bar. Early on, every page had its own query form and request logic; by the third module the duplication was no longer maintainable, so it was extracted into a unified SearchBar component, with styles and query parameters sharing one implementation.

Second, unified dialogs. Originally there was a self-built Modal component; we later switched to Ant Design's native Modal and centralized dialog state management.

Third, directory structure adjustment. Early modules were all piled under the component subdirectory with excessively deep nesting; they were later flattened into a per-module directory structure.

### 4.2 Internationalization

The project required support for four languages: Chinese, English, French, and Russian. I implemented the entire solution.

It is based on Umi's locale plugin. The language packs live in the src/locales directory, and the Chinese pack has about a thousand entries. The design uses the original Chinese text directly as the key:

```jsx
{intl.formatMessage({ id: '确定要切换到' }, { 模式: modeName })}
```

This way, translations can be looked up directly against the Chinese text without maintaining an extra mapping table; the cost is longer keys. The corresponding maintenance cost is that new copy must be synced to four language packs. There were omissions early on, but it later became a fixed habit; commits related solely to language pack syncing alone numbered more than twenty.

### 4.3 Main Map and Real-Time Situational Awareness

The main map page is the heaviest part of the entire frontend, with a single file of more than 3,700 lines.

All real-time data is pushed over socket. The page subscribes to and handles six types of events: UAV real-time position, reconnaissance unit position, device status, device position, direction-finding signal, and national-standard recognition results.

The map part addressed four key points:

1. Coordinate conversion. The backend provides WGS84 coordinates while the map uses GCJ-02, so toMapCoord was encapsulated to complete the chain conversion from wgs84togcj02 to WebMercator. Because basemaps differ across deployment environments, the GCJ-02 step is made switchable at runtime, with configuration read from a runtime config file.
2. Icon styles. Three style-generation functions were extracted, responsible for icons, lines, and grids respectively. The selected-state color change of the UAV icon and the angle-based rotation of direction icons both call the same set of functions.
3. Rendering performance. Socket pushes arrive multiple times per second, so track points and map icons are all stored in refs and kept out of the React rendering flow; only UI state uses state. This is the prerequisite for the page staying smooth.
4. Animation and cleanup. The radar scan ring is implemented with requestAnimationFrame. On component unmount, animation frames are cancelled and map listeners unbound in a unified way; otherwise re-entering the page causes animations to stack.

### 4.4 Strategy, Handling, and Parameters

The strategy management panel configures jamming strategies by frequency band. The original frequency validation was global in granularity; I changed it to validate per frequency band group, warning when the span exceeds 400MHz.

The handling drawer includes navigation jamming device selection, handling methods (suppression, expulsion, forced landing, defense), four sets of navigation frequencies, expulsion angle, and band protection. The configuration is persisted in browser local storage.

There are also a band protection dialog and a reconnaissance management panel; the latter was refactored to support multiple sets of reconnaissance parameters and a panoramic mode.

### 4.5 System Self-Check Panel

The self-check panel is split into left and right columns showing the operating status of the jamming unit and the reconnaissance unit respectively. Fields include temperature, voltage, band current, power amplifier alarms, and electronic compass angle.

The difficulty of this panel is interpreting bit semantics. Taking the reconnaissance unit as an example, the fault field is defined bit by bit: bit0 over-temperature, bit1 under-voltage, bit2 over-voltage, bit3 band one current too low, bit4 band one over-current; the jamming unit additionally contains over-current flags for five bands. Voltage and current values are stored in units of one tenth and must be converted back for display.

I added one change here: displaying the detection timestamps of the jamming and reconnaissance sides separately. Previously the two shared a single time field, making it impossible to tell which side had actually run the self-check.

### 4.6 Situational Replay

This page is likewise based on OpenLayers, with an added playback control bar. My work included remembering form conditions, a replay button, a due-north line arrow, legend style adjustments, and disabling map rotation. I also fixed the issue where target history would not render and aligned the direction-finding line drawing logic with the main map.

### 4.7 Login, Permissions, and the API Layer

The login part involved completing the login page, login layout, and authentication logic, with passwords processed using MD5. Route guards are based on the permission utility and the auth wrapper layer, and button-level permissions control visibility through a unified permission-check function.

The API layer was refactored once, splitting the interfaces that had been concentrated in a single service file into subdirectories by business module, one file per module.

### 4.8 Other

Database management supports backup and restore plus drag-and-drop SQL file upload; the unattended configuration completed the auto-mode API integration; I fixed a map configuration issue in the production environment; and I changed the spectrum scan start and stop buttons to mutually exclusive, state-linked behavior.

## 5. Key Issues and Handling

### 5.1 Duplicate Real-Time Subscription Bindings

Each call to socket.on adds a new listener, so re-entering the page or re-rendering components causes listeners to stack and callbacks to fire repeatedly.

The fix was to unbind once inside the subscription function before rebinding; if the connection has not yet been established at that point, register a one-time connect callback and bind after the connection succeeds.

There was also a hidden issue: the subscription function had no return value, yet the self-check panel contained code like const unsubscribe = subscribe(...), which received undefined, so the subsequent unsubscribe statements never took effect. The correct approach is to use a separately exported unsubscribe function. This issue was found during code review.

### 5.2 Component Library Version Differences

After Ant Design was upgraded from v4 to v5, the size class name changed from lg to large, causing the overall styles to be off by one step; this took a long time to troubleshoot.

### 5.3 Documentation Inconsistent with Code

The frontend handover document in the repository root is fairly complete, but its directory structure is already outdated. Some components mentioned in the document do not exist in the current code and actually correspond to different components. Someone taking over would be unable to locate files by following the document.

## 6. Quantitative Results

| Metric | Value |
| --- | --- |
| Total repository commits | 605 |
| My commits (including merges) | 133 |
| My commits (excluding merges) | 110 |
| Files touched | 121 |
| Management modules delivered | 13 |

Distribution by month: 13 in April, 90 in May, 9 in June, 21 in July. May saw the most concentrated effort, mainly on the data management module.

Distribution by commit type: 43 new features, 23 refactors, 18 bug fixes, 18 style adjustments, 3 engineering miscellaneous, 1 documentation, and the remaining 27 with non-standard commit messages.

## 7. Outstanding Issues

Documentation maintenance did not keep pace with code iteration. The handover document's directory structure already deviates from the actual code, and the docs directory inside the project has remained empty since it was created. This kind of work was not planned early on, and catching up later is costly.
