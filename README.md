# Jumble Solver

## Description
Solve English word jumbles with these scripts. The initial input must contain between 2 and 7 (inclusive) alphabetical characters. Beyond 7 characters the function calls would get exponentially slower.

## Versions

### Python
The python script requires [PyEnchant](https://pypi.org/project/pyenchant/) in order to work. It can be installed from the command line using `pip install pyenchant`. PyEnchant is used as a dictionary to check for valid words.

### Node
The node script (jumbleSolver--Node.js) uses [check-word](https://www.npmjs.com/package/check-word) as a dictionary to check for valid words. Another dependency is [prompt](https://www.npmjs.com/package/prompt). To use this version, from the command line run `npm install` to install the dependencies, then `npm start` to run the script. You may find that it is slower than the python version.

## Project Status

### Upcoming
* create JavaScript version of the script
* create interactive UI