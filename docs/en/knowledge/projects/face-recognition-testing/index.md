---
date: 2026-11-02
title: Face Recognition Testing
---

# Face Recognition Testing

This post records the testing and data engineering work I took on in the face recognition project. All code in this repository was written by me independently; it belongs to a different technical track from the [frontend work](/en/knowledge/projects/face-recognition/), so it is documented separately here.

## 1. Project Background

The recognition rate of the face recognition project needed a reproducible evaluation standard. Without a fixed test set and a fixed calculation method, there is no way to tell during version iterations whether a metric improved or regressed.

Based on that goal, I split the work into three mutually independent sub-projects, corresponding to three stages of the data processing chain:

| Sub-project | Responsibility | Output |
| --- | --- | --- |
| Face matching | Build the test set | Face library and recognition-rate test set |
| Statistics script | Generate evaluation reports | Metric data and chart reports |
| Dataset splitting | Clean the raw dataset | Stratified face library and validation set |

Each of the three sub-projects maintains its own dependency list and lock file, all use Python 3.11 with uv for environment management, and there are no code references between them — they interact only through output files.

## 2. My Responsibilities and Timeframe

All three sub-projects were completed by me independently, including algorithm implementation, command-line tools, pipeline orchestration, test case writing, and data processing scripts.

The actual development period was July 20, 2026 to August 31, 2026. The repository was consolidated into a single repository and committed on August 31, and the commit history was squashed into a single initial commit, so the time range was reconstructed from source file timestamps.

## 3. Tech Stack

| Sub-project | Main dependencies |
| --- | --- |
| Face matching | InsightFace, onnxruntime-gpu, numpy, opencv-python, scipy, tqdm |
| Statistics script | matplotlib, pymysql |
| Dataset splitting | numpy, Pillow |

Face feature extraction uses InsightFace's pretrained model, with a ResNet50 backbone that outputs 512-dimensional ArcFace features; the official accuracy on LFW is about 99.83%. Computing prefers the GPU and falls back to the CPU when no graphics card is available, with a speed difference of roughly ten to twenty times.

## 4. Sub-project One: Face Matching

### 4.1 Problem Definition

To pick faces for the test set, the intuitive approach is to pick the K faces most similar to that person. But in practice the result turns out to be unusable: a single person often has over a thousand candidates, and the eleven picked by maximum similarity are highly homogeneous in angle and lighting. A recognition rate measured on such a test set is inflated and does not reflect real capture conditions.

So the real requirement is to satisfy two conditions simultaneously: the samples belong to the same person, and there is enough variation between them.

### 4.2 Base Algorithm

The first version modeled the problem as a max-min diversity problem: given N candidates, choose K such that the minimum pairwise cosine similarity among those K is as large as possible. The problem is NP-hard, so a three-stage heuristic was used:

1. Multi-start greedy. Construct initial solutions from ten random seeds and keep the best one.
2. Tabu search. Locate the bottleneck edge at the minimum similarity and replace it while keeping the rest, maintain a tabu list to prevent backtracking, and track a no-improvement counter to trigger perturbation.
3. Pairwise swap optimization. Try replacing each position until no further improvement is possible.

The three stages are respectively responsible for quickly obtaining a feasible solution, escaping local optima, and converging to a local optimum.

### 4.3 Diversity Mode

The algorithm above guarantees that the selected samples form a tight cluster, but it cannot guarantee coverage of different angles and lighting. So beyond the algorithm layer, a pose-bucketing mode was added.

The implementation is: first compute the representative image, i.e. the one with the highest average similarity to the other candidates; then split candidates into three groups by horizontal rotation angle — turned left, frontal, turned right — and into two levels by brightness relative to the representative image, yielding six groups in total; then allocate quotas in proportion to each group's candidate count, with at least one for every non-empty group; finally select greedily within each group using maximal marginal relevance, where the score considers both similarity to the representative image and a penalty term against already-selected samples, balanced by a coefficient that defaults to 0.6.

Results under this mode improve markedly in coverage: the horizontal rotation angle spans roughly minus twenty degrees to plus thirty degrees, and the brightness distribution is also spread out. The cost is that the within-group similarity metric drops, but that is an expected trade-off: an evaluation dataset needs to cover scenarios rather than pursue sample homogeneity.

### 4.4 Threshold Sweep

The face detection confidence threshold is hard to fix in one go, since data quality varies considerably between batches. The implementation uses a four-level sweep with values 0.5, 0.6, 0.7, and 0.75; each level is solved independently and the best result is kept.

To avoid redundant computation, feature extraction runs only once, and all four thresholds share the same feature cache with only the filter conditions differing, so the total cost of the four-level sweep is under one second.

### 4.5 Quality Filtering

Unusable samples must be removed before algorithmic selection. The filtering criteria reference two national standards, GB/T 41772-2022 and GB/T 42981-2023.

The filtering dimensions are:

| Dimension | Criterion | Default threshold |
| --- | --- | --- |
| Sharpness | Laplacian variance | Not below 50 |
| Brightness | Mean of the HSV value channel | 60 to 220 |
| Horizontal rotation | Absolute pose angle | No more than 45 degrees |
| Pitch | Absolute pose angle | No more than 25 degrees |
| Roll | Absolute pose angle | No more than 25 degrees |
| Interpupillary distance | Distance between the two eye keypoints | Not below 28 pixels |
| Sunglasses | Weighted five-dimensional features | No more than 0.3 |
| Lower-face occlusion | Weighted five-dimensional features | No more than 0.3 |

There is one key constraint on execution order: quality filtering must come before detection confidence filtering. Detection confidence reflects how reliable the face detection is, and it is not sensitive to images that are dim but whose faces are clearly discernible; if confidence filtering runs first, such images pass through into the subsequent flow, yet they are in fact unusable for recognition. Doing quality filtering first removes them early.

Sunglasses detection introduces no extra model and relies entirely on OpenCV and the existing face keypoint data. The decision uses a scoring scheme with five features: the proportion of dark pixels in the eye region, edge density, mean grayscale, left-right eye grayscale difference, and grayscale variance. Each feature adds points by level, the total is capped at 1, and exceeding the threshold is judged as wearing sunglasses.

The direct reason for using multiple features is the high misjudgment rate of a single metric. Using only variance or only edge density makes people with lighter skin tones easy to misjudge. After repeated tuning, the recommended threshold range is 0.2 to 0.4; below 0.15 samples without glasses are misjudged, and above 0.5 light-colored or gradient lenses are missed.

Lower-face occlusion detection follows the same reasoning as sunglasses and is used to identify samples where the chin is occluded in front of the camera.

### 4.6 Configuration Structure

The first implementation had a parameter pass-through problem: a single parameter had to be threaded through five layers — command line, batching, single-directory processing, solver, and sub-algorithm — and adding a parameter meant changing five function signatures.

The improvement was to organize all parameters of a run into a single configuration object, assembled by the command line and passed down layer by layer. Inside the configuration object, it is further split by responsibility into quality filtering configuration and bucketing algorithm configuration, which do not interfere with each other. After that, adding a parameter only requires changes to the configuration definition and the command line.

### 4.7 Gender Quota

The national standard requires the gender ratio of an evaluation dataset to be close to balanced, with a deviation of no more than five percent. The pipeline accordingly implements quota scheduling, splitting the selected count evenly between men and women, with an odd slot going to men.

There is one constraint in the implementation: a person's gender can only be determined after feature extraction completes, so when the quota is exceeded, the already-written output directory must be fully deleted before skipping; otherwise an incomplete directory structure is left behind.

### 4.8 Test Set Merging

After algorithmic selection, a separate command performs the merge. It copies the scattered images under each person's directory into the test set directory in a unified way, then cleans up the intermediate directories and the two index files.

A safety check is built into the merge step: before copying a scattered image, its content digest is compared with that person's representative image, and it is skipped if they match. Without this check, original face library images would slip into the test set, and such samples carry a confidence at the ceiling value, which would directly inflate the overall recognition rate.

The command also supports a preview-only mode without execution, and a mode that skips confirmation.

## 5. Sub-project Two: Statistics Script

This sub-project is responsible for producing evaluation reports.

The data source is the recognition records table in the business database; after export, the expansion logic for attached frames is processed, and the results are then aggregated by category.

There are only two configuration items: camera ID and sample baseline count. When the camera ID is 0, the camera with the most records is selected automatically; when the sample baseline count is 0, the actual exported count is used as the denominator, while a fixed value is used to compute detection and recognition rates.

Each run is archived into a directory with an incrementing number, and the outputs include the raw records file, the file after attached-frame expansion, a Markdown report, and six charts: metric overview, recognition result distribution, raw confidence distribution, business display score distribution, image quality score distribution, and attached-frame count distribution.

Two batch entry points are also provided, one for running the pipeline and one for cleaning data. The cleaning entry first counts the number of items to delete and requires a second confirmation before performing the deletion.

## 6. Sub-project Three: Dataset Splitting

This sub-project is responsible for stratified cleaning of the raw dataset. The code took shape early, and after several rounds of iteration the fifth version is what remains.

The core design is two-tier thresholds.

The face library side uses strict criteria: horizontal rotation no more than 1.5 degrees, pitch and roll constrained to an even smaller range, dark-region pixel proportion no more than 15%, distance between the two eyes no less than 35 pixels, Laplacian variance no less than 50, brightness limited to 50 to 200; thirteen attribute categories are also excluded, including glasses, hat, blur, heavy makeup, lipstick, earrings, necklace, tie, bangs, and beard.

The test set side uses moderate criteria: geometric conditions are relaxed, the interpupillary distance floor drops to 25 pixels, the Laplacian floor drops to 30, the brightness range widens to 40 to 215, and the excluded attributes are reduced to eight items.

The reason for the tiering is that the two sides have different goals. The face library needs clean samples to ensure enrollment quality, while the test set needs to retain some difficulty to stay close to real capture. If both sides used the same strict criteria, the measured recognition rate would drift from reality; if the face library used loose criteria, the enrolled samples themselves would be of insufficient quality, making it impossible to tell whether a metric drop comes from the gallery or from the algorithm.

Another hard constraint is zero identity leakage: the test set retains only identities that appear in the face library. Otherwise the denominators for counting missed and false detections would be inconsistent and the metrics would lose meaning.

Earlier versions took a simpler approach: for each identity, the single highest-quality image went into the face library and all the rest went into the test set. Since the identity threshold was set to at least 5 images, each person had at least 4 left over, which guaranteed by count that nothing would be in the face library but absent from the test set.

The output scale is a face library of just over three hundred images and a test set of about two thousand six hundred. The test set comes with an additional manifest file that records, image by image, the original filename, identity attribution, and each quality metric, for later traceability.

A separate validation script was also implemented that does not depend on the pipeline's intermediate results and executes eight assertions: disk and manifest consistency, content digest comparison, whether test set identities are a subset of those in the library, whether each identity has at least one image, filename format, summary data consistency, attribute filtering completeness, and whether image files decode normally. The script is a pure-assertion implementation and does not depend on a test framework.

## 7. Test Case Design

### 7.1 Design Approach

The test cases use a mix of two kinds: characterization tests and defect reproduction tests.

Characterization tests lock in currently correct interface behavior. For example, the similarity computation function should return a fixed sentinel value when the input has only one element or is an empty set; such behavior is correct in itself, and pinning it with a test means that a later refactor which breaks it fails immediately.

Defect reproduction tests record known defects. When written, such a case must be in a failing state, and the failure reason must match the expected assertion; once the production code is fixed it automatically flips to passing.

The direct benefit of this approach is that discovering a defect does not require immediately interrupting current work. First record the problem with a failing case and write down the expectation, keep pushing the task at hand, and later fix them all together based on the failing cases. There is also a clear acceptance criterion at fix time.

### 7.2 Defects Found

In similarity computation, the implementation of the minimum similarity value was wrong. The original implementation took the second-smallest element in each row, but the diagonal of the similarity matrix is each item's similarity to itself, always 1.0, so the second-smallest per row was actually the maximum after excluding self, and the true pairwise minimum was discarded. The verification case uses a 2x2 matrix with all off-diagonal entries at 0.9; the correct result should be 0.9, but the actual return was 1.0.

The same function also failed to validate non-finite values: input containing NaN or infinity would not raise an error but would propagate silently.

In representative image selection, the original implementation divided by zero when the input had only one element, returning NaN without an error; with an empty set input it threw an exception directly. Both cases should return the sentinel value.

In the selection algorithm, the cardinality contract did not hold when the requested count was 0 or 1. The greedy stage always seeds two elements regardless of the target count, so when the target was 1 the loop did not execute and two elements were returned; when the target was 0 an empty array was used as the column index, triggering an index error.

In the interval convergence function, the original implementation copied the input during initialization but only modified another variable in the loop; if every attempt overshot the target interval, the fallback branch finally returned the unmodified initial value, and the caller would mistakenly believe convergence had completed.

The pipeline had four problems: the candidate count check kept one extra unit of margin, so a count that exactly met the requirement was rejected; the time budget was written directly into the passed-in configuration object, corrupting the caller's state; sequence numbers were derived by counting existing files, which could collide with an existing number and overwrite it when the directory was sparse; and output writes were not atomic, so if the representative image was written successfully and a subsequent scattered-image write failed, an incomplete result would be left on disk.

All four were fixed in later versions. But the explanatory text describing the defects is still kept in the test file headers, which no longer matches the actual current state and is a part that needs to be kept in sync.

### 7.3 Isolation Techniques

The premise for the test cases is that they do not depend on a graphics card or model files; otherwise a single run would take far too long and actual usage would approach zero.

To that end, four isolation measures were taken:

First, pipeline tests use an in-process mock feature extractor that does not load the real model or inference library; it generates deterministic vectors as features from a hash of the filename, with an interface shape identical to the real implementation, so the pipeline does not need to perceive any difference.

Second, to simulate a write failure only the file copy function is replaced in one place while all other logic stays real, so the test covers the real pipeline rather than a wholesale stand-in.

Third, extractor-related tests use lightweight objects to construct inputs matching the interface shape, and when testing sunglasses detection, program-generated images replace real photos.

Fourth, each case creates its own temporary directory and cleans it up at the end, so cases do not affect one another.

The whole suite runs on CPU only and takes seconds. The seven test files total about two thousand lines, more than half the size of the production code.

## 8. Timeline

The development process reconstructed from source file timestamps is as follows:

| Date | What was completed |
| --- | --- |
| July 20 | Dataset splitting took shape, including the filtering script, the fifth-version cleaning pipeline, and the validation script |
| July 22 to 24 | The main body of face matching, including the two algorithm implementations, feature extraction, the command line and pipeline, and the first regression cases for the algorithms and pipeline |
| July 27 | The statistics script took shape, including configuration, database access, export, reporting, cleaning, and pipeline orchestration |
| August 18 | Quality filtering and configuration structure adjustments, plus regression cases for the extractor and command line |
| August 21 | The test set merging tool and the two batch entry points |
| August 24 | A library-clearing script for the second camera |
| August 25 | Statistics configuration updates and the fourth round of report output |
| August 31 | The three sub-projects consolidated into a unified repository and committed |

## 9. Quantitative Results

| Metric | Value |
| --- | --- |
| Sub-projects | 3 |
| Python files | 35 |
| Total lines of source and test cases | About 7800 |
| Production code lines | About 5300 |
| Test code lines | About 2000 |
| Test files | 7 |
| Validation assertions | 8 |

Breakdown: face matching is about 5300 lines (including about 2000 lines of tests), the statistics script about 1370 lines, and dataset splitting about 1080 lines.

## 10. Open Issues

First, the test directory is currently not under version control and can only be run locally. The repository convention check case inside the project has already flagged this as to be fixed, on the grounds that test code should be managed alongside source code.

Second, there is no continuous integration configuration. The repository has no test framework configuration file and no automated execution entry point; everything depends on manual invocation.

Third, the explanatory text of some cases was not updated in step with the code fixes, so there are places where the documentation and the actual state are inconsistent.
