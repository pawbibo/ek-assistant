# ek-assistant (Eikaiwa Assistant)
Scripts made with NodeJS that is used to automate very simple tasks during deployment.

# Requirements
NodeJS

# Functions and Usage
## get_diff
Script that gets the difference of files from the last tag.

In your terminal:
```
# node get_diff <repository>
node get_diff front
```
## g_tag
Script that generates the release tag.

In your terminal:
```
# node g_tag <repository> <release-tag>
node g_tag front rel-2017-08-04
```
