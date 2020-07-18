# Quick Start

This is basically a love2d abstraction based on the game maker architecture and definitions.

## Instalation

This project requires only Löve2d to run locally:

**Löve2D:** Go to [Löve2d website](https://love2d.org) and follow the instructions for your OS

## Usage

The project setup is really simple. First of all add `core` folder into your project, and in your `main.lua` file import it:
```
-- main.lua
require('core.LGML')({
  entry = 'path.to.game.entity',
  debug = true
})
``` 
In the example above we are passing the option `entry`. `entry` is the path to your `LGML.Game` entity that will contain all you game definition.

## Creating a game
The following structure is recommended for the use of this framework, but you can create it as you like:

```
📦 your-game folder
 ┣ 📂 core
 ┣ 📂 src
 ┃ ┣ 📂 assets
 ┃ ┣ 📂 objects
 ┃ ┣ 📂 rooms
 ┃ ┣ 📂 sprites
 ┃ ┗ 📜 Game.lua
 ┣ 📜 conf.lua
 ┗ 📜 main.lua
 ```

First of all we will need a Game object to handle all of our rooms and objects and we will later provide it as the entry point to **LGML**. In order to create it we can use whe `LGML.Game` method:
```
-- Game.lua
local Game = LGML.Game('App')

-- Here we can setup a game include configurations and rooms
function Game:create(options)
  -- Add rooms and game configs
end

return Game
``` 

*To be continued...*