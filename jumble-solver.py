import math
import enchant

# Check which tags are available to select a dictionary from enchant module:
# print(enchant.list_languages())

tag = 'en_CA'
dictionary = enchant.Dict(tag)

def solveJumble():
    if not enchant.dict_exists(tag):
        print('Error: dictionary not available.')
        return

    jumble = input('Enter a word jumble: ')

    text = jumble.strip().lower()
    if not text.isalpha():
        print('Notice: non-alphabetical characters will be ignored.')
    
    # get alphabetical characters from provided jumble string:
    chars = []
    for c in text:
        if c.isalpha():
            chars.append(c)
    
    if len(chars) < 2:
        print('Error: input must contain at least 2 alphabetical characters.')
        return
    if len(chars) > 7: 
        # beyond 7 characters, the function takes more than exponentially longer to run
        print('Error: input cannot contain more than 7 alphabetical characters.')
        return
    
    chars = tuple(chars) # make immutable reference
    maxWordLength = len(chars)
    totalOptions = [] # a collection of unique character arrangements
    sortedWordList = {} # a dictionary that groups words together by character length in alphabetical order

    # set keys for sorted word list:
    for w in range(maxWordLength, 1, -1):
        sortedWordList[w] = []

    # recursive function to get all arrangements of a string and its substrings:
    def solveSubJumble(tupleChars):
        length = len(tupleChars)

        for i, c in enumerate(tupleChars):
            optionSet = []
            numOptions = math.factorial(length - 1)
            for x in range(numOptions):
                optionSet.append(c)
            
            copy = list(tupleChars)
            copy.pop(i)

            # will be a list of lists with each sublist containing one string of length between 2 and maxWordLength:
            finalOptionSet = []

            def getNextChar(charList, opSet, remLength):
                nestedSet = []
                subOptions = math.factorial(remLength - 1)
                start = 0
                end = subOptions

                for x in range(remLength):
                    nestedSet.append(opSet[start:end])
                    start += subOptions
                    end += subOptions
                
                for x in range(remLength):
                    for y in range(len(nestedSet[x])):
                        nestedSet[x][y] += charList[x]
                
                if remLength > 1: 
                    for x in range(remLength):
                        nestCopy = list(charList) # make copy so as not to mutate the original list
                        nestCopy.pop(x) # remove one character
                        getNextChar(nestCopy, nestedSet[x], len(nestCopy)) # repeat with reduced character list to get next character
                else:
                    finalOptionSet.extend(nestedSet)
                
            getNextChar(copy, optionSet, len(copy))
        
            for option in finalOptionSet:
                if option[0] not in totalOptions:
                    totalOptions.extend(option)
            
            if len(copy) > 1:
                # create immutable reference to shortened list of characters and run the function again:
                solveSubJumble(tuple(copy)) 

    solveSubJumble(chars)

    wordList = [] # container for valid word options

    for option in totalOptions:
        if dictionary.check(option):
            wordList.append(option)

    wordList.sort()
    
    for word in wordList:
        wordLength = len(word)
        sortedWordList[wordLength].append(word)
    
    print('Solutions:')
    print(sortedWordList)
    

solveJumble()