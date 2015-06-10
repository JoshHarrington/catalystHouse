# Starter-kit
Place to begin with web projects with lots of useful bits already setup

####Credits:
* Based on the [HTML Boilerplate project](https://html5boilerplate.com/)  
* Using the Guardian [sass-mq project](https://github.com/guardian/sass-mq)  
* JS Structure developed by [Grant Morrison](http://www.grantmorrison.net/) whilst working at [Reading Room](http://www.readingroom.com/)


### The Component Concept:

Ideally you should be trying to split your styling down based on the component that it's related to, if it's not related to the styling of a component then styling should go into main.scss in styles/scss/core

___

### Useful SCSS bits to remember

```css
&     /// inherit the name of the thing above

/// scss example

.class-name {
    &.state {
        // new state styling
        background: blue;
    }
    &:hover, &:focus {
        // hover and focus styling
        background: red;
    }
}

/// css output

.class-name.state {
  background: blue;
}
.class-name:hover, .class-name:focus {
  background: red;
}

```
  
//


```css
*     /// Apply styling to all elements
```
  
//
  

```css
* + * /// Lobotomised owl selector
```
^^ [http://alistapart.com/article/axiomatic-css-and-lobotomized-owls]

//

```css
div > a 
/// Select element right inside container
/// so here we would be styling all anchor tags directly inside divs
```
Example markup:
```html
<div>
    <a href="#na">Hi there</a> /// styling applied here
    <p>
        <a href="#na">Hello again</a> /// but not here
    </p> 
</div>
```

//

[Inception rule](http://thesassway.com/beginner/the-inception-rule) -- don’t go nest your scss more than four levels

//

```css
%container {
    display: block;
    width: 100%;
    margin: 0 auto;
    padding: 0 2em;
    max-width: 60em;
    * {
        max-width: 100%;
    }
}
```
^^ Useful method for:
- Ensuring content remains in central column
- Keep padding either side of content
- Constraint max width of content
- Stopping internal elements stretching past the width of the parent

N.B.  
Must be used with box-sizing: border-box;  
Use @extend to put styling on wrapper  

___


### Box-sizing: border-box;
Box-sizing issues will likely cause you a ton of headaches
usually it will make sense to set all box-sizing on the page to border-box
meaning that all borders and padding only fill inside the constraints of the box and don't increase it's width:  
[http://css-tricks.com/box-sizing/]  
[http://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/]


```css
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```
___

## Resources:

[http://caniuse.com/] -- really good for quickly checking whether that fancy thing you just found will work in ie8  
[http://css-tricks.com/] -- Chris Coyier is the man  
[http://codepen.io/] -- Some amazing examples of people doing stuff with HTML CSS and JS and an excellent way to present quick web ideas  
[http://stackoverflow.com/] -- you will live on here, great community of people asking and answering questions  
  
[http://jquery.com/] -- this starter-kit already has jquery included, as you get more comfortable with javascript you'll start to discover how useful jquery can be

[http://alistapart.com/] -- interesting, useful articles on web tech  
[https://prepros.io/] -- preprossing scss, js and md files // beware of the multiple requests to buy!