*GAME OF WAR APP


**Purpose: The game of war App is a project designed for the Full Flex Thinkful Capstone. It is an computer version of the card game known as War.


**To Start: 

	If the app is being accessed from Zeit.co rather than the repository, skip this step.

	From Repo: clone the repository onto your computer using git clone. Initialize the React library inside the newly created folder. Run NPM Start on the command console.


	From either the App from Zeit.co or from the one currently being run on NPM Start:

		Create a new File or Select an already made file if one exists.

**Known Issues:

As the App uses React and Node JS, a multi-threaded library and a single threaded respectively, asynchronousy in information can occur. If this happens	
refresh the page.

**Pages:

***File Menu: Access or delete any existing player files

The App will take a minute to load any existing files. During this time the user will see this

![File menu loading](https://github.com/BrittniLudington/game-of-war/blob/master/readmeimages/menuloading.PNG)

When any files have been successfully loaded, the user will see all files

![File menu loaded](https://github.com/BrittniLudington/game-of-war/blob/master/readmeimages/menuloaded.PNG)


***New File: Create a new player file

![New file page](https://github.com/BrittniLudington/game-of-war/blob/master/readmeimages/newfile.PNG)

***Instructions: Page showing how to play the game

![Instructions page](https://github.com/BrittniLudington/game-of-war/blob/master/readmeimages/howto.PNG)

***User Page: Displays stats of file selected, leads to player's current game

![User page](https://github.com/BrittniLudington/game-of-war/blob/master/readmeimages/usermenu.PNG)

***Game Page: the main page where the game is played proper

The player's hand is visible at the bottom. The player selects the card they wish to use for that round, which will be displayed near the top.
The card selected will be highlighted grey.
The number inside the white box below that signifies how many cards are left in the deck. 

![Game Page Playing](https://github.com/BrittniLudington/game-of-war/blob/master/readmeimages/gamechoiceselected.PNG)

Upon finishing a round, the round results will display, the player's card, the enemy's card, and who won the round

![Round result](https://github.com/BrittniLudington/game-of-war/blob/master/readmeimages/gameround.PNG)

After all cards have been used (14 rounds in total), the scores are tallied and a winner is displayed. During this the player can choose to start another game.

![Game result](https://github.com/BrittniLudington/game-of-war/blob/master/readmeimages/gameresult.PNG)