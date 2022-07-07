# Jumble Solver

## Description
Solve English word jumbles with these scripts. The initial input must contain between 2 and 7 (inclusive) alphabetical characters. Beyond 7 characters the function calls would get exponentially slower. It's suitable enough for games like Scrabble and Wordscapes.

[Codepen Demo](https://codepen.io/steve-dave108/pen/WNzrJjx)

## Versions

### Python
The python script requires [PyEnchant](https://pypi.org/project/pyenchant/) in order to work. PyEnchant is used as a dictionary to check for valid words. It can be installed from the command line using `pip install pyenchant` . Then you can run the script with `py jumble-solver.py` .

### Node
The node script (*jumbleSolver--Node.js*) uses [check-word](https://www.npmjs.com/package/check-word) as a dictionary to check for valid words. Another dependency is [prompt](https://www.npmjs.com/package/prompt). To use this version, from the command line run `npm install` to install the dependencies, then `npm start` to run the script. You may find that it is slower than the python version.

### JavaScript (frontend)
After cloning this repo, simply open *frontend/index.html* in a browser. The UI was primarily made using [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/).

**Note:** the script `npm run build` does not need to be run as the JavaScript bundle is already included. However, if `npm run build` was run after `npm install` it would not give a working bundle as a couple small changes need to be made to the check-word dependency (which would then disrupt the Node version). For reference, here is what was changed:

file: *./node_modules/check-word/index.js*

Original:
```
var words = function(language){ // line 3
...
var content = fs.readFileSync(__dirname + '/words/'+language+'.txt'); // line 11
```
Altered:
```
var words = function(language, content){ // line 3
// line 11 removed
```