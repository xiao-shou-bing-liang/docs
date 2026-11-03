---
date: 2026-11-02
title: Face Recognition Frontend
---

# Face Recognition Frontend

This article records the Web frontend development work I was responsible for on this project. The face feature extraction and matching algorithms were handled by others and are not covered here. The testing part of this project is recorded separately in [Face Recognition Testing](/en/knowledge/projects/face-recognition-testing/).

## 1. Project Overview

The project is a management system for face recognition business. The capabilities exposed to frontend users fall into six areas:

1. Face library. Entry, maintenance, and query of personnel information and face photos.
2. Analysis service. Manage the servers hosting analysis tasks, along with the video stream and FTP analysis tasks on those servers.
3. Data management. Query recognition records and alarm records, and configure data retention policies and the various thresholds.
4. Dictionary management. Maintain the base data for departments, personnel types, and alarm types.
5. User information. Maintain the current logged-in user's information and password.
6. Operation records. Site-wide query of operation audit trails.

Unlike the counter-UAV project, this project's frontend started from scratch with no existing skeleton. Routing, request encapsulation, state management, and permission checks all had to be built myself.

## 2. My Responsibilities and Involvement

I joined the project on March 26, 2026, and finished on August 29, 2026, responsible for the Web frontend.

My specific scope included: the face library module, analysis service module, data management module, dictionary management, user information, operation records, plus login authentication, route guards, request layer encapsulation, and engineering configuration. The AI model parameter settings page was not in my scope.

The repository has 311 commits in total, of which I authored 99; excluding merge commits that is 92, touching 67 files.

## 3. Tech Stack

| Category | Choice | Version |
| --- | --- | --- |
| Framework | Vue | 3.5.18 |
| Language | TypeScript | 5.8 |
| Build | Vite | 7.1.11 |
| UI components | Element Plus | 2.11.8 |
| Routing | vue-router | 4.5.1 |
| State management | Pinia | 3.0.3 |
| HTTP | axios | 1.12.0 |
| Encryption | jsencrypt, js-md5 | 3.5.4 / 0.8.3 |
| Other | exceljs, dayjs, lodash, codemirror | |
| Runtime | Node (pinned by Volta) | 20.20.2 |

The project only configures three scripts—dev, build, and preview—with no lint or test configured, which is engineering debt.

## 4. Specific Work

### 4.1 Face Library

The face library is the largest module in this project; its main table file is over 1,900 lines and is also the file I changed most often, 23 times in total.

For the personnel CRUD part, creation uses a multipart submission, with the data field carrying JSON and the files field carrying multiple images. Deletion always goes through the batch API; single deletion likewise submits an array containing one item, so the backend only needs to maintain one code path.

Face entry supports two approaches: entering by personnel ID, and automatic matching by filename. A single person can store at most 9 faces; before entry the existing count must be queried to calculate the remaining quota, and any excess is truncated to the remainder with a prompt. Image formats are limited to JPG and PNG, no larger than 1MB each.

For deleting face images, I settled on an upload-then-delete order, that is, the old image is removed only after the new one uploads successfully. The reverse order would mean a failed upload leaves that person without a photo.

The batch personnel upload dialog has three design points:

1. The template is generated browser-side with ExcelJS, with a fixed five-column header and three rows of sample data pre-filled.
2. On upload, columns are located by fuzzy matching the header names rather than relying on column order, so imports still work if the user has reordered the columns.
3. File formats are limited to xls, xlsx, and csv, no larger than 10MB per file; at most 5 errors are shown along with the total count.

The template sample data deserves separate mention. Initially random strings were used for filling, but since this template targets real users, sample values need a credible format, otherwise users will misunderstand the field norms. In the end, crypto.getRandomValues was used to generate random numbers; ID numbers are constructed per the GB 11643 check-digit algorithm, with the weight table and check code table implemented per the standard, administrative division codes taken from a real division table, and birth dates limited to 1970 through 2005.

In addition, the naming convention for matching faces by filename was standardized as name plus ID number, and this was written into the instructions of the face entry dialog.

### 4.2 Analysis Service

This module uses a left-right layout, with a server list on the left and the task list for the selected server on the right.

The server side covers create, edit, delete, and status query. Create and edit reuse the same dialog; host and port are read-only and auto-filled, the IP is validated in IPv4 format, and the port is limited to 1 through 65535. When editing, leaving the password blank means no change, so the password field must be removed entirely before submission to avoid being overwritten with an empty value. Server entries show a primary service marker, corresponding to the isLeader field of the API.

Metric cards show disk, VRAM, memory, CPU, and GPU usage plus the last heartbeat time.

Server details refresh via 30-second polling, addressing two problems:

1. Request races. When switching servers, the previous server's response may arrive later and overwrite the current data. The fix was to introduce an incrementing request sequence number and compare it when the response returns, discarding it on mismatch.
2. Status flapping. A single failed request does not mean the service is offline, so it is judged offline only after 3 consecutive failures.

The task side covers CRUD, batch delete, and starting and stopping analysis. Blackout periods support configuration by weekday and time range; the end time must be later than the start time, compared by the string order of hours and minutes. Task types are divided into video stream and FTP file service; after selecting a camera, the corresponding protocol address is assembled automatically, and preview playback uses jessibuca.

Selection state persistence was one of the more time-consuming items. The requirement was for checked tasks to remain selected across pagination and server switches. The final implementation has three layers: the table enables row-selection preservation and specifies a row key; after data loads, items outside the current page are compared and re-selected; and a copy is synced to state management for cross-page and batch-export use. The re-selection logic was added to fix the problem of selected rows being lost.

For batch import and export, export downloads via a blob with a timestamped filename; the import template is served by the backend, and import results show three counts—succeeded, duplicate, failed—plus the per-row failure reasons.

Batch stop analysis needs a timeout that scales dynamically with the number of tasks; otherwise, with many tasks the request is cut off by the gateway's 60-second timeout.

### 4.3 Data Management

This module has three tabs: database storage, event analysis, and camera alarm settings.

The database storage tab displays recognition records, and I added two columns on top of the existing ones. One is face resolution, obtaining the actual width and height from the image URL. The other is face quality, displayed in three tiers by quality score, with hover support to view the raw value. This tab also supports image-based search.

The data retention policy is a hard constraint, so I validate once at the UI layer and once at the submit layer. The reason is that the input component's value range limit only applies to the UI; bypassing the component and modifying the form object directly defeats it. Retention days are limited to 1 through 180, and minimum remaining disk to 1 through 6144 GB. The lower bound is set to 1 because a value of 0 would cause records to be cleared immediately.

The merge threshold dialog provides a merge switch, a merge time window, and two similarity thresholds for confirmed match and suspected match. The interaction uses an edit-mode toggle; on cancel it re-fetches the server configuration to discard local changes, and if the fetch fails it keeps the previously displayed values. The image search threshold dialog uses the same interaction pattern.

### 4.4 Dictionary Management

This page has three tabs: department dictionary, personnel type dictionary, and alarm type dictionary.

The first two offer full CRUD, with department names requiring uniqueness validation that trims spaces and ignores case, excluding the record itself in edit scenarios. Alarm types are a read-only list.

Each time dictionary data is fetched it is also written to state management, so dropdown options on other pages can reuse it directly and avoid duplicate requests.

### 4.5 User Information and Operation Records

The user information module covers querying the current logged-in user's information, updating information, and changing the password; the action column is shown only to the current administrator. The avatar uses a built-in icon from the component library rather than a remote image, because external resources cannot load in the intranet environment.

Operation records are a standalone module whose fields include operation module, operation action, operation description, client IP, execution result, failure reason, duration, and creation time.

### 4.6 Login and Password Encryption

The project has two kinds of passwords with different algorithms.

Platform user account passwords use MD5, producing a 32-character lowercase hex string. Analysis server host passwords use RSA: in the implementation the public key is requested first, and the public key is cached and deduplicated across concurrent calls so only one request is in flight at a time; the encryption module is brought in via dynamic import and does not enter the main bundle.

The login flow is form validation, password processing, calling the login API, writing the token and user information, and finally returning to the original page according to the redirect parameter.

### 4.7 Route Guards and Exception Fallback

The global beforeEach guard has four responsibilities: setting the page title, validating token expiry, redirecting to the login page with a redirect parameter when not logged in, and checking the role for administrator pages.

The post-login redirect back was an added implementation. The original logic lacked this capability, so visiting a restricted page before logging in left the user unable to return; redirect parameter passing was added.

In addition, route-level exception handling was added to deal with resource load failures after the frontend is redeployed. The scenario is an old tab holding an entry file that still points to old-version resources, so clicking a menu item that has never been loaded causes the dynamic import to fail, and the failed module is cached, manifesting as normal hover behavior but no response on click. The fix is to catch this class of exception and force a full-page redirect to fetch the latest resources, with a timestamp recorded through session storage for a 10-second debounce to avoid repeated refreshes.

### 4.8 Engineering

For the dev proxy, business APIs are forwarded uniformly to the backend service; configuration APIs are forwarded through a custom plugin, with the target determined dynamically by a request header, because different analysis servers' configurations come from different hosts.

For deployment configuration, the reverse proxy's read and write timeout was raised to 300 seconds to accommodate long-running APIs such as batch stop analysis; the request body limit was raised to 100MB to support batch Excel imports. The container image contains only static assets and proxy configuration, with the build done in an external script.

For static checks, SonarQube scan configuration was added.

For documentation, a code statistics tool was used to analyze the source by language, layer, and module, compiled into a project description that includes file size rankings and the comment ratio of each directory. Total source is just over ten thousand lines, with an effective code ratio of about 79.7%.

## 5. Key Issues and Handling

### 5.1 No Mock Data Files

The project has no standalone mock data file; the only mock data generation logic is embedded in the batch upload dialog and used to fill the template's sample rows. Searching by directory name early on cost considerable time.

### 5.2 Orphaned Component

During development I extracted a separate confirmation dialog component, only to find afterward that the main table actually uses the component library's confirm box; the file is not referenced anywhere.

### 5.3 Password Change Not Wired to the Backend

The password change page declares in its file-header comment that it depends on the encryption module, but the implementation neither imports the encryption logic nor the request module; it only performs local validation and then reports success, so it is an unfinished feature.

### 5.4 Missing Server Connection Test

A server connection test feature was implemented in mid-April, but the current version has no related button or API, with only one explanatory comment left.

### 5.5 Misreading the Workspace Configuration

The workspace configuration file in this project is not a multi-package workspace definition; its content is merely an allowlist for dependency install scripts, used to permit the build steps of specific dependencies. In addition, the repository has two sets of lock files at the same time, and the package name still uses the scaffold default.

## 6. Quantitative Results

| Metric | Value |
| --- | --- |
| Total repository commits | 311 |
| My commits (including merges) | 99 |
| My commits (excluding merges) | 92 |
| Files touched | 67 |

Distribution by month: 6 in March, 34 in April, 24 in May, 20 in June, 8 in July, 7 in August. April saw the most concentrated effort, mainly corresponding to API integration for the face library and the analysis service.

Distribution by commit type: 36 new features, 34 bug fixes, 5 refactors, 3 style adjustments, 5 engineering miscellaneous, 3 documentation, and the remaining 13 with non-standard commit messages.

Ranked by file change count: face library main table 23, data management table 18, analysis service task table 18, user information table 11, analysis service detail layout 11.

## 7. Outstanding Issues

First, documentation maintenance. The statistics and architecture description in the project description were completed in the middle of development and have not been kept up to date since.

Second, engineering standards. The project lacks lint and unit test configuration, and static checks have not been incorporated into the continuous integration pipeline either.

Third, unfinished features. The password change API is not wired up, and the server connection test feature is missing in the current version.
