# Servera

[![NPM version](https://badge.fury.io/js/servera.png)](http://badge.fury.io/js/servera)
[![Dependency Status](https://gemnasium.com/gummesson/servera.png)](https://gemnasium.com/gummesson/servera)

*Servera* manages and serve your local static sites.

It's heavily inspired by [distra](https://github.com/phuu/distra), although it's a dumbed down version without the whole `/etc/hosts` configuration part.

It works on both Windows and Linux, and should hopefully work on OS X too.

## Installation

~~~
npm install -g servera
~~~

## Configuration

Run `servera init`, go to your home directory (`~/` or `C:\Users\USERNAME`) and edit the `.servera.json` file to match your projects.

**NOTE:** you have to use absolute paths in the `dir` keys.

**Example:**

~~~ json
{
  "myproject": {
    "dir": "/home/USERNAME/Dev/myproject",
    "port": 3000
  }
}
~~~

## Usage

~~~

  Usage: servera [options] [command]

  Commands:

    *                      Serve the project
    .                      Serve the current directory
    list                   List all projects
    init                   Create the ".servera.json" file

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

~~~

**Example:**

~~~ bash
$ servera myproject

# >>  Dir: /home/USERNAME/Dev/myproject
# >> Port: 3000
~~~

~~~ bash
$ servera . 

# >>  Dir: /home/USERNAME/path/to/current/directory
# >> Port: 9000
~~~

## License

The MIT License (MIT)

Copyright (c) 2013 Ellen Gummesson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
