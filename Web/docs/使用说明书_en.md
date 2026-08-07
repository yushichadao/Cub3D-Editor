# Cube · 3D Design Workshop — User Manual

## A heuristic textbook from zero to mastery (web version)

> This book is not a cold feature list, but a textbook you can **follow along, do along, and think along with**.
> We assume you have never touched 3D design, or even used professional software. Like a teacher sitting beside you,
> we start from "what is 3D", guide your thinking with questions, build intuition with analogies, and reinforce muscle memory with exercises,
> until you move from "knowing which button to click" to "being able to create independently".

---

## How to use this book

| Item | Description |
| --- | --- |
| Audience | Absolute beginners; also hobbyists who want to level up systematically |
| Teaching style | Heuristic: ask *why* first, then *how*, then give an exercise |
| Scope | Covers all features of the web editor (interface, shapes, color, transform, text, brush, eraser, views, shortcuts, files, advanced & practical) |
| Coordinate convention | This book **always uses the axis labels actually shown on the web page** (page labels: X = blue = front/back, Y = red = left/right, Z = green = height, Z points up). The internal implementation differs from the page labels; ordinary readers need not care |
| Reading advice | Read the first four Parts in order; the remaining eight Parts can be consulted on demand. Be sure to do the "Think" and "Practice" at the end of every chapter |
| Online address | https://yushichadao.github.io/3d-editor/ (open the page and start practicing) |
| Project repo | https://github.com/yushichadao/3d-editor (source code and this document are both here) |

**Notation**
- 💡 Tip: time-saving experience
- ❓ Think: a question to guide your thinking
- ✏️ Practice: a hands-on exercise
- ⚠️ Caution: a pitfall to avoid

---

## Full Table of Contents

**Part 1 · Getting Started (zero to beginner)**
- Ch1 Re-meeting "3D": Starting from a Photo
- Ch2 Preparing the Tool: Opening This Tool
- Ch3 The Whole Interface: The Five Areas in Front of You
- Ch4 Coordinate System: The Three Lines Labeled X / Y / Z on the Page
- Ch5 Let's Build: Your First 3D Work
- Ch6 Export & Share: Screenshots, Scene Export, and Backups

**Part 2 · Operation Basics**
- Ch7 The Art of Selecting Objects: Single, Multi, and Box Select
- Ch8 The Transform Trio: Translate, Rotate, Scale
- Ch9 Transform Modes and the Uniform Scale Lock
- Ch10 Undo and History: The Confidence to Experiment

**Part 3 · The Universe of Shapes**
- Ch11 3D Shapes Overview (how to classify the 20 types)
- Ch12 2D Shapes Overview (the 20 types and the "sticker" mindset)
- Ch13 Parameters of Every 3D Shape (1): Basic Solids
- Ch14 Parameters of Every 3D Shape (2): Special Shapes
- Ch15 "Standing" vs "Lying": The Essential 3D/2D Difference

**Part 4 · Color & Material**
- Ch16 Color Basics
- Ch17 27 Preset Colors
- Ch18 Custom Color Picking
- Ch19 12 Patterns
- Ch20 Uploading Image Textures, Opacity & Wireframe

**Part 5 · Text & Image**
- Ch21 Adding Text: Let the Scene Speak
- Ch22 Font, Size, Weight, Vertical/Horizontal
- Ch23 Image Object: Bringing Photos into the 3D World

**Part 6 · Pen & Eraser**
- Ch24 2D Brush: Drawing Lines on the Ground
- Ch25 3D Brush and the Reference Plane
- Ch26 Eraser: Whole vs Partial

**Part 7 · View & Observation**
- Ch27 Seven Preset Views: See the World from Another Angle
- Ch28 Locking the View, Hiding Aids, and Fullscreen

**Part 8 · Efficiency**
- Ch29 Why Learn Shortcuts: The Compound Interest of Efficiency
- Ch30 Mouse & Gesture Operations: for both desktop and mobile
- Ch31 Single Keys & Shift Combos
- Ch32 Slider/Input & Ctrl Combos

**Part 9 · Transform**
- Ch33 First Transform Controls: Three "Gripping Tools"
- Ch34 Translate Mode: Drag Objects with the Arrow
- Ch35 Rotate Mode: Rings Decide Which Axis to Spin Around
- Ch36 Scale Mode: Square Handles and the Uniform Switch

**Part 10 · Crowds**
- Ch37 Selecting a Group: Understanding "Selection Sets"
- Ch38 Moving a Group: The Master Pivot of Multi-select
- Ch39 Mass Production: Copy, Clone, and Arrays
- Ch40 Export & Share: Taking Work Off-screen

**Part 11 · Practice**
- Ch41 Project 1: Build a Small House
- Ch42 Project 2: Make a 3D Text Slogan
- Ch43 Project 3: Design a Logo / Icon
- Ch44 Project 4: Comprehensive Scene "My Little Courtyard"

**Part 12 · Troubleshooting & Appendix**
- Ch45 FAQ Troubleshooting
- Ch46 Glossary (Chinese–English)
- Ch47 Quick Shortcut Reference
- Ch48 Shape · Pattern · Color Index

**Part 13 · Sticky Notes & Multilingual**
- Ch49 Take Notes While Reading: Sticky Notes in the Manual
- Ch50 Floating Sticky Windows: Pin a Note on Screen
- Ch51 Multilingual: the Manual Also "Speaks" Your Language

---

## Preface: to you who have never touched 3D

When you first open this web page, you might feel a little nervous. 3D? Modeling? Isn't that the kind of thing that takes ages to learn in some heavy software?

Take a deep breath first. 🙂

The tool in front of you is a **pure web-based 3D editor** — no installation, no graphics-driver setup, no courses to enroll in. It compresses "creating a 3D world" down to the level of "click, drag, type a few words".

Understand *why* in the first ten Parts, and pick up the *how* in the rest, and you'll be able to build a small world of your own. No rush — let's go one step at a time.

---

# Part 1 · Getting Started

## Chapter 1 · Re-meeting "3D": Starting from a Photo

### 1.1 Where is the difference between 2D and 3D

Take a photo of your desk with your phone. The photo is **2D**: it has width and height, but when you touch it with your finger it is flat — it only *looks* three-dimensional.

Now walk around to the side of the desk and look again. A real desk is **3D**: it has width and height, and also **depth** (the part where the legs extend forward). When you move, the shape you see changes, but the photo stays frozen at that single moment.

💡 **One-line memory**: 2D is a "picture"; 3D is a "real space you can walk around in".

### 1.2 What this web tool gives you is a "3D stage"

When you open the editor, the central canvas becomes a 3D stage. Pick a shape from the left, click on its "ground", and it really "drops" into the stage — you can walk around behind it, lift it up, or look down from above.

❓ **Think**: When you describe to a friend "a red ball to the left of a blue box", which is less likely to be misunderstood — a 2D photo or a 3D scene? Why?

### 1.3 Why "web version"

Traditional 3D software like Blender or Maya is powerful, but its installer is hundreds of MB and the screen is packed. This tool moves only the core functions into the browser.

- Open the web page and use it instantly; close it and you're done — no disk space wasted;
- All computation happens locally on your PC; **no data is ever uploaded**;
- Output is ordinary JSON files and PNG images, making saving and sharing easy.

✏️ **Practice**: Open a new browser tab, enter this tool's URL, and confirm you can see the central canvas and the surrounding panels. You don't need to operate yet — just "get familiar with the environment".

---

## Chapter 2 · Preparing the Tool: Opening This Tool

### 2.1 How to enter (public web access)

This tool is a web app deployed online; **no installation, no source download** — just open the public URL below in any browser:

> 🌐 **Online address**: https://yushichadao.github.io/3d-editor/

Copy the URL into your browser's address bar and press Enter to enter the main screen. Phone, tablet, or computer — anything with internet and a browser works.

💡 The first load takes a very short moment (3D engine initialization); once the loading layer disappears you are in the main screen.

### 2.2 System requirements

This tool is a pure front-end web app with low device requirements:

- Any modern browser (recent Chrome, Edge, Firefox, Safari);
- Supports WebGL (almost all devices in recent years do);
- Just open the public URL above — nothing needs to be installed locally.

⚠️ **Caution**: If the page is blank after opening, first open the console with `F12` (top-right) and check for red errors. Trying another browser usually solves it.

### 2.3 Where to look first

On launch, your view is surrounded by five areas. We'll break them down one by one next chapter. For now, remember one sentence: **"Pick materials on the left, create in the center, adjust parameters on the right, manage files on top, switch views on the bottom."**

✏️ **Practice**: Match the words below to where the five areas are on screen (top bar / left panel / canvas / right panel / bottom bar).

---

## Chapter 3 · The Whole Interface: The Five Areas in Front of You

The screen is divided into five areas, each with a role. Find the corresponding spot on screen as you read.

### 3.1 Top bar (very top)

A row of buttons split into three groups.

- **File group**: New · Import · Export · Screenshot;
- **Edit group**: Undo · Redo · Copy · Paste · Clone · Clear;
- **View group**: Axes toggle · Grid toggle · Settings.

💡 Almost all of these buttons have shortcuts (e.g. `Ctrl+Z` for Undo). We'll cover them together in the Efficiency part later.

### 3.2 Left panel (pick materials · choose tools)

The left panel has four sections from top to bottom.

1. **3D Shapes**: 20 solid shapes (cube, sphere, cylinder…);
2. **2D Shapes**: 20 flat shapes (circle, heart, arrow…), like stickers;
3. **Tools**: Select/Transform · 3D Brush · 2D Brush · Eraser · Add Text · Add Image;
4. **Transform Mode**: Translate · Rotate · Scale, plus the uniform-scale lock.

### 3.3 Canvas (the central stage)

All shapes are displayed here. Right-drag to orbit the view, wheel to zoom, left-click to select or place.

### 3.4 Right panel (adjust parameters after selecting)

The right panel only "wakes up" once you have selected an object. Change color, apply texture, adjust opacity, set transform values, edit text… this is where you precisely control your work.

### 3.5 Bottom bar (very bottom)

A row of 7 view buttons: Perspective · Top · Bottom · Front · Back · Left · Right. One click changes the angle to view the scene.

### 3.6 On a narrow screen

On phones or narrow windows, the left/right panels auto-collapse; press the small edge button to expand them. It is designed to "work even on small screens".

❓ **Think**: Why is "change parameters" on the right and "pick materials" on the left? This reflects the "materials on the left, adjustments on the right" habit common to many design tools. Do you agree?

✏️ **Practice**: Hover each button on the top bar in turn and check whether a tooltip appears. It helps you memorize each button's purpose.

---

## Chapter 4 · Coordinate System: The Three Lines Labeled X / Y / Z on the Page

This is the most important chapter in the book. Many people give up on 3D software right at "can't read the axes". Let's take it slow.

### 4.1 First, drop the baggage of "math class axes"

You may have memorized the "right-hand rule" for three axes in math class. Forget that first. In this tool, **an axis is just an arrow with a color and a text label** — a way to answer "where in space is this object, and which way is it facing?"

### 4.2 The labels you actually see on screen

Turn on the "Axes" display (the 📐 button on the top bar). Three arrows appear, labeled **X · Y · Z** at their tips, each a different color.

> ⚠️ **Important**: The X/Y/Z written on the screen of this book and this tool is the **"web label"**, and does not fully match the axes used internally by the software. Ordinary readers only need to **look at the screen labels**. The mapping below is what you truly see on screen:

| Web label | Arrow color | Direction | Familiar analogy |
| --- | --- | --- | --- |
| **X** | 🔵 Blue | **Front/Back** (depth) | You "step forward / step back" |
| **Y** | 🔴 Red | **Left/Right** | You go "left / right" |
| **Z** | 🟢 Green | **Up/Down** (height) | You "rise on tiptoe / squat" |

In other words, on this web: **Z is the single up-pointing axis (green), X is front/back (blue), Y is left/right (red)**.

💡 One trick: **"Blue = front/back, Red = left/right, Green = up/down (Z pierces the sky)."**

### 4.3 Why is "height" Z, not Y

In many 3D tools height is Y. But this tool's **screen label** puts height on Z (the green one). You are not mistaken — **this web simply labels it that way**. This book explains everything from "screen labels" start to finish, so as long as you watch the colors and letters on screen you won't get lost.

❓ **Think**: If you were to redesign it, which letter would you assign to "height"? The letter itself is just a name. What matters is that "name, color, and direction" all agree.

### 4.4 The ground and "height = 0"

At the bottom of the stage is a **grid ground**. The ground is the reference for "height = zero". When you place something on the ground, its Z (height) is 0. Lift it and Z grows.

In web labels, the ground is the horizontal plane spanned by **X (front/back) and Y (left/right)**, written as "Z = 0". You don't need to memorize the formula — just understand **the ground is your "footing", and going up (green axis Z) is rising**.

### 4.5 Feel the three axes with your body

Stand up and do three movements.

- One step forward, one step back → you move along **X (blue)**;
- Slide left, slide right → you move along **Y (red)**;
- Rise on tiptoe, squat → you move along **Z (green)**.

Etch this into your muscles and you'll have a reference for every "move object" operation that follows.

✏️ **Practice**: Show the axes and switch between "Top" and "Front" views (bottom-bar buttons); observe whether the arrows' directions match your body sense. In Top view you see the X–Y plane; in Front view the X–Z plane.

---

## Chapter 5 · Let's Build: Your First 3D Work

Watching alone is not enough. In this chapter we actually make a small work you can screenshot and share: **a colored cube standing on the ground**.

### 5.1 Step 1: Pick a shape

1. Find the "3D Shapes" section in the left panel;
2. Click the 1st "Cube" (or any solid you like);
3. Notice that when the mouse enters the canvas it is in "placement mode" (a preview usually follows the cursor).

### 5.2 Step 2: Place it

**Click** the central ground. The cube "drops" onto the grid with a thud. Congratulations — your first 3D object is born.

💡 Don't panic if you can't see where it landed — once you learn "select" next chapter you can move it anytime.

### 5.3 Step 3: Select it

Click the "Select / Transform" tool at top-left, then **single-click** the cube. Arrows and a frame appear around it, showing it is "selected", and the right panel lights up.

### 5.4 Step 4: Color it

In the right panel's "Color" section:

- Click a **preset color** directly (e.g. bright orange) and the cube changes instantly;
- For something more personal, use the custom color "picker" tool.

⚠️ **Caution**: Choosing "No Color" or setting opacity to 0.1 makes the object transparent and "invisible", but it is not gone. Just revert it.

### 5.5 Step 5: Move and rotate a little

Keep it selected, drag the arrows to translate (blue = front/back / red = left/right / green = up), drag the rings to rotate. Feel the three axes you learned in Ch4.

### 5.6 Step 6: Save the result

Use the top-bar "Screenshot" (or `Ctrl+P`) to get a PNG. Or "Export" to keep a JSON, which you can "Import" next time to continue editing.

✏️ **Practice**: Repeat the steps to make a small scene of "a blue cube to the left of a red sphere", then save it with a screenshot. Can you describe each object's position to a friend using body movements (front/back · left/right · up/down)?

---

## Chapter 6 · Export & Share: Screenshots, Scene Export, and Backups

You'll want to keep what you made and show it to others. This chapter explains four "save" methods and when to use each.

### 6.1 Why "export often" is a good habit

When you close or refresh the web page, an un-exported scene is lost. The habit of "export JSON whenever you reach a milestone" will save you many times.

### 6.2 Screenshot: photograph your work (Ctrl + P)

"Screenshot" saves the current screen as a **PNG image**.

- Good for: social posts · illustrations · showing someone the "look";
- Tip: before screenshotting, hide the **axes and grid** from the top bar for a cleaner image;
- Output size matches the current canvas pixels.

💡 A screenshot saves only the "look" and contains no re-editable data. If you want to edit later, use "Export" below.

### 6.3 Scene Export: keep an editable "project" (Ctrl + S)

"Export" generates a **JSON file** recording each object's position, color, parameters… Next time you "Import" it, the scene is restored exactly.

- Good for: unfinished work · pieces you want to polish;
- File names usually carry a timestamp, so rename to something meaningful (e.g. `house_v1.json`).

### 6.4 Import: read the project back (Ctrl + O)

Pick a previously exported `.json` and the scene is rebuilt. ⚠️ Import **replaces the current scene**. Save your current work first.

### 6.5 New: from scratch (Ctrl + N)

"New" clears the entire scene. Dangerous, but safe if you "back up with Export first".

### 6.6 A reliable backup rhythm

> Export once before you start → export again at key milestones (with a different file name) → `Ctrl+Z` back anytime.

✏️ **Practice**: Save the "red cube and blue sphere" scene from Ch5 once as a Screenshot and once as an Export, then Import it back and check the contents match.

---

## Chapter 7 · The Art of Selecting Objects: Single, Multi, and Box Select

In the 3D world, the iron rule is **"select first, then operate"**. This chapter thoroughly explains the small act of "selecting".

### 7.1 Why you must select first

The right panel's parameters and transform arrows all target the **currently selected object**. Without a selection, the tool doesn't know *who* you want to change. It's like you can't hand a "certificate with only one name" to the whole class at once — you must call roll (say the name) first.

### 7.2 Single select: click

With the "Select / Transform" tool, **left-click** an object. It highlights and shows controls, indicating it is "selected".

### 7.3 Multi-select: Shift + click

Hold `Shift` and click another object to **add** it to the selection. Click an already-selected object again to **remove** it.

💡 After multi-selecting, transforming moves all objects together as one block; the reference is their "group center".

### 7.4 Box select: drag a rectangle

Press and hold the left button on empty space and drag a rectangle; everything inside the frame is selected. Good when you want to "grab a bunch at once".

⚠️ **Caution**: Box select starts from "empty space". If you start the drag on top of an object, you'll move that object instead.

### 7.5 Select all: Ctrl + A

One click selects every object in the scene. Handy combined with "Clear all" or a whole-scene transform.

### 7.6 Deselecting

- Click empty space;
- or press `Esc`.

### 7.7 Can't select? Check these first

1. Are you still in "placement mode"? Switch back to the "Select / Transform" tool first;
2. Is the object you want hidden behind another? Change the view (bottom bar) and circle around to the front;
3. Is it transparent (opacity 0)? Revert it first;
4. Is it a 2D brush stroke? Some pen objects need the eraser or special logic and can't be selected by a normal click.

❓ **Think**: Between multi-select and box select, which suits "precisely pick 3 non-adjacent items" and which suits "select a whole row at once"?

✏️ **Practice**: Place 5 different shapes and practice ① single-select one ② Shift-add up to 3 ③ box-select a group ④ Ctrl+A select all ⑤ Esc deselect.

---

## Chapter 8 · The Transform Trio: Translate, Rotate, Scale

"Transform" is the most frequent action in 3D creation. Its essence is three things: **move position, turn orientation, change size**.

### 8.1 What the three transforms are

| Transform | Familiar analogy | On-screen control |
| --- | --- | --- |
| Translate | Carry a cup from left to right on the desk | Three colored arrows |
| Rotate | Turn the cup's mouth toward you | Ring/arc handles |
| Scale | Make the cup bigger / smaller | Square handles |

### 8.2 Translate: drag along the three axes

Select an object and colored arrows appear — red, green, blue (web labels: Y red = left/right, Z green = height, X blue = front/back).

- Drag the **red arrow** → move along Y (left/right);
- Drag the **green arrow** → rise/fall along Z (height);
- Drag the **blue arrow** → move along X (front/back).

💡 Dragging just one arrow moves only that direction and won't be pulled off course. To move freely on a diagonal, drag the "plane block" between the arrows.

### 8.3 Rotate: turn around an axis

Switch to "Rotate" mode and the object is surrounded by rings.

- Drag a ring → rotate around its corresponding axis. E.g. turning the "front" from front to left is rotating around Z (height, green axis).

⚠️ **Caution**: Rotation is "around which axis". Learn the knack: around the green axis (Z) = spin in place; around the blue axis (X, front/back) = nod; around the red axis (Y, left/right) = tilt your head.

### 8.4 Scale: change size

Switch to "Scale" and drag the handles to enlarge/shrink. Default is **uniform** (the lock is covered in Ch9).

### 8.5 Want precision? Use the numbers on the right

Dragging is by feel; parameters are by input. The right panel has a numeric box for each transform.

- Position: three numbers X / Y / Z (under web labels: front/back / left/right / height);
- Rotation: three angles;
- Scale: a multiplier.

💡 For a "perfectly aligned" layout, entering identical numbers is far more accurate than eyeballing a drag.

✏️ **Practice**: Place a cube, first drag the arrow to move it up-right. Then set X·Y·Z in the right numeric boxes to integers (e.g. 2, 0, 3) and observe the exact landing point.

---

## Chapter 9 · Transform Modes and the Uniform Scale Lock

Last chapter was about the actions; this chapter is about "how to switch modes" and "locking the ratio".

### 9.1 Where the three modes switch

At the bottom of the right panel (after selecting an object) are three buttons "Translate / Rotate / Scale", also switchable by shortcut (detailed in the Efficiency part). Switching changes the object's controls to the matching look.

### 9.2 What the uniform scale lock is

When scaling there is a "uniform scale lock" switch.

- **On**: scales synchronously in every direction; the shape **does not deform** (sphere stays a sphere, box stays a box);
- **Off**: allows **single-axis stretch** — e.g. squash a sphere into an ellipse, stretch a box into a rod.

⚠️ **Caution**: The uniform-scale field only shows when "single-select and uniform scale on". In multi-select it is disabled (scale the whole via the transform controls).

### 9.3 When to unlock

To make a "squashed washer", "stretched pillar", or "flat elliptical lens", unlock and drag a single axis. This is the key to going from "standard body" to "characterful body".

❓ **Think**: Why are "squashed sphere" and "standard sphere" two different visual languages in 3D? What is each good for?

✏️ **Practice**: Place a sphere, turn off the uniform lock, and squash only Z (height, green axis) down to 0.3 to get a "UFO / flat disc". Feel single-axis scaling.

---

## Chapter 10 · Undo and History: The Confidence to Experiment

The biggest psychological wall for beginners is "afraid of making mistakes". This chapter gives you peace of mind.

### 10.1 Undo and Redo

- `Ctrl + Z`: undo one step;
- `Ctrl + Y` (or `Ctrl + Shift + Z`): redo.

You can step back many steps, and redo forward again.

### 10.2 What the "history stack" is

Inside the software an **operation list** is recorded (like the browser's back history). Each important operation pushes one entry; undo pops the last one.

⚠️ **Caution**: History has a **step limit**. Old operations get "pushed out" of the list and can't be undone — so export a JSON backup at key milestones (Ch6).

### 10.3 What enters history, what doesn't

- **Enters history**: adding/removing objects · color changes · transforms · textures — any "change to the work's content";
- **Doesn't enter history**: mere view rotation or observation zoom (these are "ways of looking", not changes to the work itself).

So you can safely orbit and observe without fear of the view changes piling up as undo steps.

### 10.4 The mindset to experiment without fear

> Every operation is undoable + backup at key milestones = there is no real "messing up".

Stick this saying in your heart and you can click around without fear.

✏️ **Practice**: Do 5 different operations (add object · change color · move · scale · delete one) in a row, then mash `Ctrl+Z` to rewind step by step, then `Ctrl+Y` to replay — feel the "time machine".

---

# Part 3 · The Universe of Shapes

3D creation, in the end, is "putting the right shape in the right place". This part first spreads out all **40 shapes**, then explains the fundamental 3D vs 2D difference.

## Chapter 11 · 3D Shapes Overview (how to classify the 20 types)

### 11.1 What a "3D shape" is

A 3D shape has **volume** — it catches light and shadow, blocks objects behind it, and you can look all around it. This tool offers 20 solids from cube to the curious torus knot.

### 11.2 Quick list of the 20

| # | Key | Name | At-a-glance feature |
| --- | --- | --- | --- |
| 1 | box | Cube | 6 square faces |
| 2 | sphere | Sphere | round and bulging |
| 3 | cylinder | Cylinder | circle top/bottom, straight tube |
| 4 | cone | Cone | sharp tip, round base |
| 5 | torus | Torus | donut |
| 6 | knot | Knot | braided-loop ring |
| 7 | icosa | Icosahedron | 20 triangular faces |
| 8 | octa | Octahedron | pointed top/bottom, bulging middle |
| 9 | dodeca | Dodecahedron | 12 pentagonal faces |
| 10 | capsule | Capsule | pillar with rounded head |
| 11 | pyramid | Square Pyramid | square base, sharp tip |
| 12 | prism | Triangular Prism | triangular column |
| 13 | tube | Curved Tube | bent pipe |
| 14 | lathe | Lathe | vase / top shape |
| 15 | tetra | Tetrahedron | 4-face pyramid |
| 16 | barrel | Barrel | slightly bulging cylinder |
| 17 | dome | Dome (hemisphere) | half egg / round roof |
| 18 | helix | Helix Ring | 3/4-turn loop |
| 19 | octaPrism | Octagonal Prism | 8-sided straight column |
| 20 | star3d | 3D Star | thick star |

### 11.3 Three ways to classify (find quickly among 20)

- **By everyday familiarity**: box · sphere · cylinder · cone are closest to real-life objects, recommended for beginners;
- **By strength of "geometric feel"**: Platonic solids (icosa/octa/dodeca/tetra) are very "mathematical"; knot/helix/tube are very "fluid";
- **By use**: architecture uses box/cylinder/prism/pyramid/dome; decoration uses torus/star3d/heart(2D)/lightning(2D); organic modeling uses sphere/capsule/lathe/barrel.

### 11.4 What to pick first

If unsure, first train your feel with **box**, feel "curved shading" with **sphere**, and finally enjoy a "solid you can see through the middle" with **torus**.

❓ **Think**: Cube, sphere, or cone — which "holds the most with the least material"? This is actually a real-world problem (containers and tanks are designed around it).

---

## Chapter 12 · 2D Shapes Overview (the 20 types and the "sticker" mindset)

### 12.1 What 2D is

A 2D shape has **no thickness** and lies flat on the ground like cut paper (XY plane, Z=0). Good for symbols, marks, and decorative patterns.

### 12.2 The 20 types, one by one

| Key | Name | What it's like / use |
| --- | --- | --- |
| square2 | Square | tile, marker base |
| circle2 | Circle | button, sun, dot |
| triangle | Triangle | warning, mountain peak |
| star | Star | rating, decoration |
| hexagon | Hexagon | honeycomb, nut, tech feel |
| heart | Heart | love, like |
| pentagon | Pentagon | house plan, badge |
| octagon | Octagon | stop sign, manhole |
| ellipse | Ellipse | lens, orbit |
| parallelogram | Parallelogram | skew pull, perspective block |
| trapezoid | Trapezoid | frustum, roof side |
| diamond | Diamond | diamond, pointer |
| rightTri | Right Triangle | slope, right-angle mark |
| arrow | Arrow | direction, flow |
| crescent | Crescent | moon, hook |
| semicircle | Semicircle | arch, sector |
| ring2d | Ring (hole) | target, halo |
| cross | Cross | medical, positioning |
| lightning | Lightning | energy, warning |
| teardrop | Teardrop | tear, pendant |

💡 Among these, the 2D shapes **heart / arrow / crescent / cross / lightning** have **no independent shape parameters** (their fields are empty). To resize them you can only use overall scale or the transform controls.

### 12.3 The "sticker mindset"

Think of 2D as a sticker stuck on the ground. It always lies flat and never stands up. The upside — in Top view it becomes a crisp symbol diagram, and combined with texture and color you can make floor guide lines, a company logo decal, checker patterns, and so on.

### 12.4 Watch out for hiding

Because 2D lies on the ground, a 3D object pressing from above hides it. From some angles a thin 2D shape vanishes into a "line" and disappears. To make it stand out, lift it a bit (along Z, the green axis) or place it in an open area.

✏️ **Practice**: Place one each of square2 · heart · arrow · star and see their clearest pose in "Top" view. Then in "Perspective" view see how they "lie down".

---

## Chapter 13 · Parameters of Every 3D Shape (1): Basic Solids

> This section explains the 10 most-used solids one by one. Each uses four lines — look / analogy / use / tip — to build intuition quickly.

### 13.1 Cube · box
- **Look**: a hexahedron with equal width, depth, height.
- **Analogy**: shipping box, die, brick.
- **Use**: building walls, base, anything "square".
- **Tip**: the most stable "base" shape. To make a low wall, squash it along Z (green/height) — turn off the uniform lock.

### 13.2 Sphere · sphere
- **Look**: a perfect round ball.
- **Analogy**: basketball, star, bubble.
- **Use**: head, celestial body, decorative ball.
- **Tip**: a sphere is easiest to "spread" a texture/image on; good for icon balls.

### 13.3 Cylinder · cylinder
- **Look**: equal circles top and bottom, straight side.
- **Analogy**: can, pillar, candle.
- **Use**: beam column, tube body, tower body.
- **Tip**: shrink the top radius (parameter or scale) for a "narrow-top, wide-bottom" mortar-bowl feel.

### 13.4 Cone · cone
- **Look**: round base, sharp tip.
- **Analogy**: ice-cream cone, traffic cone, tent top.
- **Use**: pointed roof, signal light, Christmas-tree tiers.
- **Tip**: stack several cones, each smaller, to build a "tiered tower".

### 13.5 Torus · torus
- **Look**: donut with a hole in the middle.
- **Analogy**: hula hoop, tire, ring.
- **Use**: ring decoration, pipe elbow, halo.
- **Tip**: being "see-through-the-hole" is a great example of a truly solid object.

### 13.6 Knot · knot
- **Look**: a loop braided like a plait.
- **Analogy**: rope knot, energy symbol.
- **Use**: tech-feel decoration, logo主体.
- **Tip**: the form is complex, so use a solid color or simple texture and avoid texture distortion.

### 13.7 Icosahedron · icosa
- **Look**: a polyhedron close to a sphere, built from 20 equilateral triangles.
- **Analogy**: soccer ball (cousin of the classic 32-face), mineral crystal.
- **Use**: gem, die, low-poly style ball.
- **Tip**: the representative of "low-poly" aesthetics; pairs with pure colors for a premium look.

### 13.8 Octahedron · octa
- **Look**: two sharp points top/bottom, bulging in 8 faces in the middle.
- **Analogy**: diamond cut, double cone.
- **Use**: crystal, gem, abstract sculpture.
- **Tip**: rich light-and-shadow changes when rotated; good as a "focal decoration".

### 13.9 Dodecahedron · dodeca
- **Look**: a sphere-like polyhedron with 12 pentagonal faces.
- **Analogy**: magic stone, die (D12).
- **Use**: mystical symbol, ornament.
- **Tip**: many faces, so a texture shows one copy per face. Keep complex textures modest.

### 13.10 Capsule · capsule
- **Look**: a cylinder with a hemisphere at each end.
- **Analogy**: capsule pill, truck, bowling pin.
- **Use**: simplified human torso, hose, rounded column.
- **Tip**: "softer" than a pure cylinder; often used for characters and creatures.

✏️ **Practice**: Build a "street lamp" from box + cylinder + cone — cylinder for the pole, box for the lamp body, cone for the top cover. Feel the power of combining basics.

---

## Chapter 14 · Parameters of Every 3D Shape (2): Special Shapes

### 14.1 Square Pyramid · pyramid
- **Look**: square base + one sharp tip.
- **Analogy**: Egyptian pyramid, roof.
- **Use**: tower, pointed-roof architecture, monument.
- **Tip**: unlike a cone, its "slopes" are 4 flat triangles — more "man-made building" feel.

### 14.2 Triangular Prism · prism
- **Look**: a straight column with triangular cross-section.
- **Analogy**: triangular prism, road obstacle, roof beam.
- **Use**: triangular beam, wedge, tech component.
- **Tip**: lay it on its side for a "slope block"; combine with other bodies to make a ramp.

### 14.3 Curved Tube · tube
- **Look**: a round tube running along a curved path.
- **Analogy**: bent straw, water pipe, ribbon.
- **Use**: flowing line, pipe, decorative ribbon.
- **Tip**: the form is decided by an internal curve (currently one S-shape); good for "motion" elements.

### 14.4 Lathe · lathe
- **Look**: a body born by spinning a profile around a central axis (vase / top shape).
- **Analogy**: vase, light bulb, top, wine glass.
- **Use**: symmetric container, vessel, sculpture.
- **Tip**: this kind of shape is born with "beauty of symmetry"; a solid color or vertical gradient texture shows best.

### 14.5 Tetrahedron · tetra
- **Look**: the smallest polyhedron with 4 triangular faces.
- **Analogy**: triangular pyramid, crystal shard.
- **Use**: pebble, low-poly decoration, sharp symbol.
- **Tip**: few faces, hard edges — perfect for a "hard / tech" style.

### 14.6 Barrel · barrel
- **Look**: a cylinder bulging slightly in the middle (slight taper).
- **Analogy**: wooden barrel, wine barrel, rocket mid-section.
- **Use**: container, airframe, water tank.
- **Tip**: more "belly" than a straight cylinder; makes creatures and containers livelier.

### 14.7 Dome · dome
- **Look**: hemisphere (upper half).
- **Analogy**: yurt (ger) ceiling, observatory, bell cover.
- **Use**: roof, cover, planetarium.
- **Tip**: with a box it becomes a "roofed hut"; flip it (rotate) and it becomes a "bowl".

### 14.8 Helix Ring · helix
- **Look**: a loop rotated about 3/4 turn (one segment of a torus).
- **Analogy**: a segment of spring, whirl, DNA fragment.
- **Use**: dynamic decoration, whirl symbol, energy ring.
- **Tip**: strongly "unfinished" in form; good for expressing "rotation / flow".

### 14.9 Octagonal Prism · octaPrism
- **Look**: a straight column with 8 vertical edges.
- **Analogy**: octagonal standing pillar, lighthouse, vertical-shaft wall.
- **Use**: neat standing pillar, tower body, base.
- **Tip**: more "angled" than a cylinder, more "rounded" than a box — a nice compromise.

### 14.10 3D Star · star3d
- **Look**: a five-pointed star extruded into a thick solid.
- **Analogy**: medal, star charm, decoration.
- **Use**: award symbol, decoration主体, logo.
- **Tip**: because it has thickness it "stands", and feels heftier than the 2D star.

❓ **Think**: If you could build a "robot" from 4 or fewer 3D shapes, which 4 would you pick? What part is each?

---

## Chapter 15 · "Standing" vs "Lying": The Essential 3D/2D Difference

### 15.1 Volume vs Area

- **3D has volume**: occupies space, casts shadow, hides each other. It "stands" on the ground and has height (Z, green axis).
- **2D has only area**: spreads flat in one sheet, thickness is zero. It "lies" on the ground (Z=0).

Understand this and you'll see why 3D can "stack like a pyramid" while 2D can only "lay flooring".

### 15.2 Why one stands and one lies

In code, 3D uses `seatOnGround` to drop the bottom face to y=0 (web label Z=0), while 2D uses `shape2D` rotated onto the XZ plane (ground). So:

- Place a box and it naturally "sits" on the ground;
- Place a heart and it naturally "sticks" to the ground.

### 15.3 Tips for mixing

- Want a 2D to "stand"? Rotate it 90° around the red axis (Y) — from "lying" to "standing" — making a signboard or placard;
- Want a 3D to "lie down"? Rotate it sideways into a "fallen log" or "leaning plank";
- Ground symbol (arrow for wayfinding) + solid building is the most common combination in a scene.

✏️ **Practice**: Place an arrow (2D), select it and rotate 90° around Y (red/left-right); watch it change from a "lying arrow" to a "standing sign". This is the free switch between standing and lying.

---

# Part 4 · Color & Material

Color is the "emotion" of a work. This chapter starts from "what is light", goes through 27 preset colors, custom color picking, and 12 patterns, and finally explains image texture and opacity.

## Chapter 16 · Color Basics: the game between the human eye and light

### 16.1 Color is not something an object "has originally"

A red apple in the dark is black — you see red because light hits it and "reflects" into your eye. So **color = object + light**. This tool uses `MeshStandardMaterial` (a light-receiving material); the scene has ambient light (intensity 1.0) and directional light (intensity 2.6), giving objects shading.

💡 That's exactly why the same color looks "darker" on a face with no light — the color didn't change, the light decreased.

### 16.2 RGB: the screen mixes three primaries

Displays mix **Red (R) · Green (G) · Blue (B)** light to make every color. The tool's preset `0xff0000` means "full red, no green/blue = pure red".

### 16.3 HSV: the intuition of how the human brain picks color

More than RGB, people prefer to pick by **Hue (H, what color) · Saturation (S, how vivid) · Value (V, how bright)**. When you drag the picker, you're actually adjusting HSV.

- Hue = a full turn through red-orange-yellow-green-cyan-blue-purple;
- Low saturation → grayish; high → vivid;
- Low value → dark; high → bright (even whitish).

### 16.4 Two hidden material parameters

Object surfaces have `roughness` (roughness/0.6, higher = more matte) and `metalness` (metallic feel/0.0, higher = more metal-like). The current default leans "matte plastic". You change the color; these two usually stay, but knowing they exist explains "why there's no mirror reflection".

### 16.5 Opacity: letting light through

Besides color there is "translucency". Detailed in Ch20 later, but remember: opacity 1 = solid inside, 0 = invisible.

❓ **Think**: Why do hospital walls and surgical gowns often use "low-saturation light blue / light green"? How does color saturation high-or-low affect human emotion?

✏️ **Practice**: Place a white sphere, switch to various views, and watch whether the unlit face darkens. This is intuitive proof that "light makes color".

---

## Chapter 17 · 27 Preset Colors: one-click coloring

The fastest way to color is to click a preset directly. This tool has **27 built in**, grouped into 4 by the source-code comments.

### 17.1 Black / White / Gray (1–3)
| Name | HEX | What it's like |
| --- | --- | --- |
| Black | `#000000` | ink, night, outline |
| White | `#ffffff` | paper, snow, highlight |
| Gray | `#888888` | cement, neutral background |

### 17.2 Three primaries RGB (4–6)
| Red | Green | Blue |
| --- | --- | --- |
| `#ff0000` | `#00ff00` | `#0000ff` |

### 17.3 Three secondaries CMY (7–9)
| Cyan | Magenta | Yellow |
| --- | --- | --- |
| `#00ffff` | `#ff00ff` | `#ffff00` |

### 17.4 Extended colors (10–27, a softer modern palette)
brightRed `#ff4444`, orange `#ff8800`, gold `#ffcc00`, brightGreen `#44ff44`, teal `#00cc88`, brightBlue `#4488ff`, purple `#8844ff`, rose `#ff44aa`, lightCyan `#6ee7ff`, lightPurple `#c084fc`, lightPink `#fb7185`, emerald `#34d399`, amber `#fbbf24`, skyBlue `#60a5fa`, pink `#f472b6`, lavender `#a78bfa`, coral `#f87171`, slateGray `#94a3b8`.

💡 Preset colors are "safe palettes" tuned by a designer; beginners clicking them directly are basically fine. To make a brand color, use custom in Ch18.

✏️ **Practice**: Color the Ch13 "street lamp" with presets — pole slateGray, lamp body amber, top cover coral. Feel "palette = personality".

---

## Chapter 18 · Custom Color: HEX · HSV and the screen color picker

### 18.1 What HEX is

HEX is `#` followed by 6 hexadecimal digits, two digits each for R · G · B. E.g. brand color `#1e90ff` (dodger blue). To reproduce a specific color exactly, typing HEX directly is most reliable.

### 18.2 How to drag the picker

Open the "picker" button in the right panel and a color window appears: a "big color block + hue bar + HEX/RGB input boxes".

- Click/drag inside the big color block → choose **saturation + value** (left-right = depth, up-down = brightness);
- Drag the **hue bar** below → adjust **hue** (a full turn through red-orange-yellow-green-cyan-blue-purple);
- For absolute accuracy, typing numbers into the HEX or R/G/B boxes is most stable.

💡 To find "tints of one hue", keep the **hue bar fixed** and only drag up-down inside the big block (change value) — the most harmonious result.

### 18.3 Screen color picker (eyedropper)

Some versions have a "pick color from screen" feature. Click the eyedropper, then click anywhere on screen (including another object's color or the background) to sample that color. Extremely handy for "sampled from reality" palettes.

### 18.4 What "No Color" (NO_COLOR) is

In the source there is a special marker `NO_COLOR = -1`. Choosing it means the object **does not apply a solid-color fill** (often combined with image texture or special material for a "no undercoat" effect).

⚠️ **Caution**: accidentally choosing "No Color" makes the object look "uncolored / dark", but it isn't broken. Just re-select a normal color.

✏️ **Practice**: Type your favorite color in HEX (e.g. `#ff6b6b`), paint a cube, then sample a color from somewhere on the page with the eyedropper and compare the two.

---

## Chapter 19 · 12 Patterns: give the surface a story

Solid color is too flat; a pattern gives an object "content". This tool has **12 built-in patterns** (`PATTERNS`).

| Pattern | What it's like / use |
| --- | --- |
| Solid | no pattern, cleanest |
| Grid | chessboard, tablecloth, tile |
| Stripe | zebra, warning, fabric |
| Dot | polka-dot skirt, candy |
| Gradient | sky, metal transition |
| Brick | wall, architecture |
| Diagonal | speed, tech |
| Wave | water wave, silk |
| Dots | pixel, tech panel |
| Cross | mesh cloth, bandage |
| Mesh | graph paper, engineering |
| Spiral | whirl, spiral tube |

💡 A pattern usually has two layers — "main color + pattern color" — adjustable separately in the right panel, making endlessly varied surfaces.

⚠️ **Caution**: applying a complex pattern (brick, mesh…) to a low-poly sphere "stretches and distorts" — that's normal. For a tidy look, prefer flat-faced bodies like box/cylinder.

✏️ **Practice**: Place a box and try "Brick" "Grid" "Stripe" in turn; feel how a pattern instantly changes "what it looks like" (wall vs fabric vs warning sign).

---

## Chapter 20 · Uploading Image Textures, Opacity & Wireframe

### 20.1 Uploading an image: paste a photo onto the surface

Besides preset patterns, you can **upload your own image (PNG/JPG) as a surface texture** — company logo, photo, hand-drawing, anything. Once applied, the picture is "printed" on the object's surface.

- Good for: a display board with a real photo, a medal printed with a logo, ground with a map pasted on;
- Tip: use a square, sharp image; pasting on a box face is clearest.

### 20.2 Opacity

Adjust "Opacity" in the right panel.

- 1 = completely solid;
- 0.1 = almost invisible;
- in-between = translucent (glass, ghost, water feel).

💡 "Glass cover", "ice", "phantom" all rely on this. Translucency lets objects behind show through, instantly enriching the sense of layers.

### 20.3 Wireframe

Turning on "Wireframe" leaves only the skeleton lines (triangular mesh); solid faces disappear. Good for:

- Seeing structure (education, explanation);
- Making "wireframe tech-style" decoration;
- Confirming whether the shape is as intended.

### 20.4 Combinations

- Pattern + translucent = faint veil;
- Image + wireframe = infographic style;
- Solid color + high transparency = glass block.

❓ **Think**: To express "a piece of ice", how would you combine color, opacity, and texture? To express "a translucent brick wall", what effect is it for?

✏️ **Practice**: Upload one image of yours and paste it on a flat box. Then set the box opacity to 0.5 and watch the "image becomes translucent" effect. Finally turn on wireframe to see the skeleton.

---

# Part 5 · Text & Image

Besides shapes, a scene also needs "text" and "photo" to convey information. This part covers the two "content-type" objects: text and image.

## Chapter 21 · Adding Text: let the scene speak

### 21.1 Text is a "speaking thin plate"

Signs, names, hints, slogans… text gives a 3D scene meaning. A text object is essentially "a thin plane with characters on it", and like a normal object it can be selected, moved, rotated, scaled, and colored.

### 21.2 Add text in 3 steps

1. In the left panel "Tools", choose "Add Text";
2. Click the central ground and an **input box** pops up (placeholder "Enter text······");
3. Type characters and press **Enter** to confirm; the text drops onto the ground.

💡 The placeholder "Enter text······" is just a reminder "type here", not content itself. It won't appear in the final work.

### 21.3 Change content: double-click

Want to change the words after placing? **Double-click** the text object and the input box reappears; change and Enter. No need to delete and remake.

### 21.4 Text is a full object

Text supports all normal operations: select, move (blue front/back / red left/right / green up), rotate, scale, recolor, adjust opacity. You can even make "glowing text" or "translucent text".

✏️ **Practice**: Add one line "Welcome", move it to the scene entrance. Then double-click to change "Welcome" to "Welcome!" and feel the ease of instant editing.

---

## Chapter 22 · Font, Size, Weight, Vertical/Horizontal

When you select text, text-specific controls appear in the right panel. This tool offers **8 fonts** and several layout switches.

### 22.1 How to choose the 8 fonts

| Font | Feel / use |
| --- | --- |
| Microsoft YaHei | modern, clear, default first choice for Chinese |
| SimSun | formal, bookish |
| KaiTi | handwritten, traditional, plaque |
| SimHei | heavy, eye-catching title |
| FangSong | official document, delicate |
| Arial | western modern sans-serif |
| Times | western serif, formal |
| Courier | western monospace, code/typewriter feel |

💡 For Chinese content prefer the first five. For pure English the last three give different vibes.

### 22.2 Font size (default 80)

The default font size is **80**, adjustable in the right panel. Too big "breaks" the scene's proportion; too small is invisible.

⚠️ **Caution**: font size is relative to scene units, so it must be combined with shape size — a size-500 text on a 1.2-unit cube will be far bigger than the object.

### 22.3 Weight (bold switch)

One click makes it bold, making titles stand out. Paired with SimHei/KaiTi it really shows a "plaque" feel.

### 22.4 Horizontal / Vertical

- **Horizontal**: normal single line, left to right;
- **Vertical**: arranged top to bottom, good for Chinese plaques, book titles, signs.

💡 Combination ideas: vertical + KaiTi + large size = traditional plaque; horizontal + SimHei + medium size = modern sign.

⚠️ **Caution**: Text that is too long may exceed the thin plate's width; reduce the size or use line breaks as needed.

✏️ **Practice**: Make a vertical plaque "Tea House" (KaiTi, vertical, large size, wood-grain color) and feel the "personality" of font combinations.

## Chapter 23 · Image Object: Bringing Photos into the 3D World

### 23.1 Adding an image object

In the left panel "Tools", choose "Add Image" → pick a local image file → click the ground, and the image appears as a **flat sprite** (like an erected photo).

### 23.2 Operate it like any normal object

Once selected it can be moved, rotated, and scaled. Lean it against a wall, lay it flat as ground decoration, or lift it to make a sign.

### 23.3 An image can also be a "texture"

As covered in Ch20, an image can be "pasted" onto any 3D surface as its surface material. So the same photo has two uses:

- **As an independent sprite**: a "photo" inside the scene;
- **As a surface texture**: printed onto the surface of a box / cylinder.

### 23.4 Image vs 2D shape

| | Image object | 2D shape |
| --- | --- | --- |
| Content | your photo / logo | a shape generated by the software |
| Color change | usually adjusted as a whole via texture | solid color / variable texture |
| Typical use | real photos, real logos | symbols, markers, decoration |

Both are "thin" and can be stood up or laid down, so pick whichever fits.

✏️ **Practice**: Import one of your photos and stand it in the scene as a flat sprite. Then paste the same image as a texture on a box front and compare the two uses.

---

# Part 6 · Pen & Eraser

The previous parts used "standard shapes"; this part is about "freehand" — with the brush you draw lines in the scene as if holding a pen, and with the eraser you remove them.

## Chapter 24 · 2D Brush: Drawing Lines on the Ground

### 24.1 What the 2D brush is

The 2D brush draws **flat lines on the ground (XZ plane)**, like pen on paper. Good for floor patterns, paths, doodles, and ground guides.

### 24.2 How to use it

1. In the left panel "Tools", choose "2D Brush";
2. On the central ground, **hold the left button and drag**; releasing finishes one stroke;
3. You can draw several strokes in a row.

### 24.3 Hold Shift to constrain to a straight line

While dragging, holding **Shift** constrains the line to a **straight line (between two points)**. Handy for "a straight road" or "a clean edge".

> Direction lock: Once you enter the constrained-straight-line mode, the direction stays locked to the horizontal / vertical / 45° direction first decided, and **cannot change until you release the left button (finish the stroke)** — even if the cursor drifts. To pick a new direction, release the button and start a new stroke.

### 24.4 The four brush attributes

Set them in the right panel (when the brush is active):

| Attribute | Role |
| --- | --- |
| Color | line color |
| Width | line thickness |
| Opacity | how solid the line is |
| Min spacing | minimum distance between sampled points; smaller = smoother and denser points |

💡 Smaller min spacing makes a finer line but more vertices; larger saves vertices but looks more polygonal. Use a small value for delicate curves, a larger one for rough sketches.

### 24.5 Brush vs 2D shape

- A 2D shape is a "standard shape" (circle, heart…) whose color and texture are changeable;
- A 2D brush stroke is "any line you drew by hand" — free but irregular.

Use a shape for standard symbols, a brush for hand-drawn doodles.

✏️ **Practice**: With the 2D brush, draw an "∞" on the ground, then hold Shift and draw a straight line through it — feel the difference between free and constrained lines.

---

## Chapter 25 · 3D Brush and the Reference Plane

### 25.1 What the 3D brush is

The 3D brush draws a **solid pipe in space** — not stuck to the ground, but a "pipe line" floating in the air. This lets you "draw in the air".

### 25.2 The reference plane: the first stroke decides "which layer to draw on"

The 3D brush's first click sets one translucent **reference plane**. Subsequent drags reference this plane and the line lands near it.

💡 Want a **horizontal** line? First switch to "Top view", click to set a horizontal reference plane. Want a **vertical** line? Switch to "Front / Side view" first, then set a vertical plane. The reference plane's orientation decides the "dimension" you draw in.

### 25.3 Draw on the plane, Ctrl to constrain to a straight line

- Drag on the reference plane for free drawing;
- Hold **Ctrl** while dragging to constrain to a straight line (similar to Shift in 2D, but acting on the spatial pipe).

> Direction lock: same as above — once Ctrl constrains the line, the direction is locked for the whole stroke and cannot change mid-stroke; release the button and start a new stroke to change it.

### 25.4 Ball-cap ends

Both ends of each stroke get automatic **ball-cap ends**, so the line starts and ends rounded and seamless, like a real pipe with end caps.

### 25.5 Uses

- Easily carve ribbons, connecting lines, energy beams;
- Draw "dynamic lines" in a scene (more organic than placing standard bodies);
- Abstract art, circuit schematics.

❓ **Think**: Is the 3D brush's "reference plane" concept like a painter "binding paper first"? Why is this "virtual paper" especially needed in 3D?

✏️ **Practice**: Switch to "Top view", use the 3D brush to set a horizontal reference plane and draw one wavy line. Then switch to "Front view" and draw another vertical line — feel the dimensional difference of spatial lines.

---

## Chapter 26 · Eraser: Whole vs Partial

Made a mistake? You can erase. This tool's eraser has two modes with different behavior — tell them apart.

### 26.1 Where to switch the two modes

In the right panel's eraser attributes there is an "Eraser mode": **Whole erase / Partial erase**.

### 26.2 Whole erase (default)

Drag the eraser ring and whatever it touches is deleted as a **whole object** (one stroke, or one whole shape). This is the "sweeping" cleanup.

💡 To quickly delete one 3D stroke or one shape, just circle it in whole mode and it's gone instantly.

### 26.3 Partial erase

Turn on "Partial erase for 2D strokes":

- **2D strokes**: only the **segment intersecting the eraser ring** is erased; the rest remains (precise line fix);
- **Other objects**: still the **nearest one** (whole) is deleted.

⚠️ **Caution**: Partial mode erases 2D hand-drawn lines segment by segment, but standard shapes and 3D strokes are still deleted as whole objects. Don't expect partial mode to "bite a corner off a cube".

### 26.4 Eraser size

The "Eraser size" slider adjusts the ring radius — precise detail work and large-area cleanup both go through it. Too small and you erase many times; too large and you easily delete neighbors by mistake.

### 26.5 Erased by mistake? Undo

Objects deleted by the eraser also enter history — `Ctrl+Z` brings them back. So erase boldly.

✏️ **Practice**: Draw one long curve with the 2D brush, first use "partial erase" to remove one small segment (the rest stays), then use "whole erase" to circle another stroke and watch it vanish root and all — compare the two modes.

---

# Part 7 · View & Observation

"Changing the angle to look" usually makes things clear. This part explains how to read and fix the observation angle.

## Chapter 27 · Seven Preset Views: See the World from Another Angle

### 27.1 Why switch views

The human eye has only one angle and easily misjudges "which way is front/back/left/right, which is higher". One click to change the view is like walking around the work. There are **7 view buttons** on the bottom bar.

### 27.2 The seven views, one by one

| View | You are… | Main plane seen (web label) |
| --- | --- | --- |
| Perspective | standing and looking normally | near-big far-small, most natural |
| Top | looking down from straight above | X (blue/front-back) × Y (red/left-right) plane |
| Bottom | looking up from straight below | same as Top but flipped |
| Front | looking flat from dead front | X (blue/front-back) × Z (green/height) plane |
| Back | looking flat from dead behind | same as Front but opposite direction |
| Left | looking flat from dead left | Y (red/left-right) × Z (green/height) plane |
| Right | looking flat from dead right | same as Left but opposite direction |

💡 Remember the web labels: **X blue = front/back, Y red = left/right, Z green = height**. In Top view you see "front-back × left-right" (ground); in Front view you see "front-back × height" (elevation).

### 27.3 When to use which

- **Perspective**: overall observation, screenshot display;
- **Top**: precise placement, aligning a row (top-down is most accurate);
- **Front / Left / Right**: check "is it straight / aligned", symmetric composition;
- **Bottom / Back**: rare, but verify "is the back/bottom as expected".

❓ **Think**: Why do architects draw "plan, elevation, side views"? Of these 7 views, which three correspond to those three engineering drawings?

✏️ **Practice**: Place 3 different shapes, click Top / Front / Right in turn, and observe how the same scene "looks different" per view.

---

## Chapter 28 · Locking the View, Hiding Aids, and Fullscreen

### 28.1 Lock the current view

On the top bar you can "Lock current view". After locking, the camera won't auto-rotate with your operations, so you can focus on fine-tuning a fixed angle.

💡 When doing precise alignment, lock the view first and adjust slowly — the screen won't "move on its own".

### 28.2 Hide the axes and grid

The top bar has two switches: "Axes" and "Grid surface".

- Hide axes: remove those three labeled arrows;
- Hide grid: remove the ground grid lines.

⚠️ **Caution**: Before exporting a screenshot / display image, **hide the axes and grid first** — the picture is cleaner and feels more "finished". They're just aids and don't affect the work itself.

### 28.3 Fullscreen

Click the top bar or press **F11** for fullscreen — the canvas fills the screen for immersive observation. **Esc** exits (in fullscreen, Esc first leaves fullscreen, a second press deselects).

### 28.4 A practical combo

> For a clean display image: hide axes + hide grid + switch to Perspective + (optional) fullscreen + screenshot.

✏️ **Practice**: Make a small scene, first hide axes/grid for a "clean image", then show them for an "image with guides", and compare how others see it.

---

# Part 8 · Efficiency

## Chapter 29 · Why Learn Shortcuts: The Compound Interest of Efficiency

### 29.1 A fact easily underestimated

Do a small experiment. Place a cube, drag the right-panel "uniform scale" slider back and forth 10 times with the mouse, then press the keyboard `+` / `-` keys 10 times.

You'll almost certainly notice: **the keyboard is faster, more accurate, and less tiring**.

Three reasons:

1. **No need to leave the keyboard's home row** — eyes on screen, fingers on letter keys. The brain stops bouncing between "look at screen → find panel → move mouse → drag slider".
2. **Fixed steps**: one arrow-key press moves the object exactly "0.1 grid"; 10 presses = exactly 1 grid. After 10 slider drags you can't remember how far it moved.
3. **Stackable and undoable**: each keyboard operation enters the history stack (Ch32), so `Ctrl+Z` rewinds one step. A slider drag is continuous change and often "jumps" when undone.

💡 **One mindset**: mouse "selects" and "draws"; keyboard "changes" and "adjusts". Split the roles and efficiency doubles.

### 29.2 Shortcuts also have "context"

This tool's shortcuts are not "globally unique" — **their meaning changes with whether an object is currently selected**.

| Current state | What do the arrow keys / A D W S do |
| --- | --- |
| **Nothing selected** | the **camera** moves (looking around the scene) |
| **An object selected** | the **object** moves/turns (the object moves in the scene) |

Even the same `↑` key: with nothing selected it "pushes the lens forward"; with something selected it "moves the object forward". This difference is the core of the whole shortcut system. Etch it in your brain now to avoid confusion later.

❓ **Think**: Why is "moving the camera when nothing is selected" a reasonable design — because you're usually "hunting for an angle, looking at the whole". Moving the view directly with the keyboard is more accurate than dragging empty space (dragging is continuous, no steps).

### 29.3 First, review the "axis language"

Every "along X / Y / Z" phrase in this part is learned by the **screen labels** (matching the axes you see on screen):

- **X axis (blue) = front/back** (blue ≈ depth)
- **Y axis (red) = left/right** (red ≈ left/right)
- **Z axis (green) = height, up is positive** (green ≈ height)

> ⚠️ Note: this is the "screen-label axis". Internally the code uses a different set (X red / Y green / Z blue, Y up), but what you see on screen, in this manual, and in the help panel is always the label above. Just memorize the label axis; don't be distracted by the internal implementation.

Memorize this table and every later chapter just "composes sentences" from it.

---

## Chapter 30 · Mouse & Gesture Operations: for both desktop and mobile

The tool's "quick operations" **switch automatically by device**: mouse on desktop, gestures on phone/tablet. The two tables below are **identical** to the "Mouse operations" and "Gesture operations" shown in `Settings → Quick Operations` in the app — read the one that matches your device.

### 30.1 Mouse operations (desktop)

| Operation | Description |
|---|---|
| Left Click | Select object / control |
| Double Left Click | Edit text |
| Long Press Left | Manipulate object / control |
| Long Press Right | Orbit view |
| Long Press Middle | Pan view |
| Scroll Wheel | Zoom view |

### 30.2 Gesture operations (mobile / tablet)

| Operation | Description |
|---|---|
| Single Tap | Select object / control |
| Double Tap | Edit text |
| Long Press Object | Toggle add/remove selection (Shift+click equivalent) |
| Drag Object | Manipulate object / control |
| Drag Blank Area | Orbit view |
| Tap Blank Area | Deselect all |
| "Select All" Button | Select all objects |
| "Box Select" Button | Enable single-finger drag to box-select objects |
| Two-Finger Drag | Pan view |
| Pinch Gesture | Zoom view |

💡 Gesture operations map one-to-one to mouse operations: Single Tap = Left Click, Drag Object = Long Press Left to manipulate, Pinch = Scroll Wheel to zoom… just a different "input organ". With no keyboard on a phone, these gestures are your "quick operations".

---

## Chapter 31 · Single Keys & Shift Combos

Keyboard shortcuts follow one core rule: **check whether an object is selected**. The two tables below are **identical** to "Single Keys" and "Shift Combos" in `Settings → Quick Operations` in the app — use them directly.

### 31.1 Single keys

> With selection: translate 0.1 grid (0.15 units) / rotate 5°{br}No selection: pan view 0.1 grid / rotate 5°

| Key | With Selection | Without Selection |
|---|---|---|
| `↓` / `↑` | Move along X +/− | View back / forward |
| `→` / `←` | Move along Y +/− | View right / left |
| `PgUp` / `PgDn` | Move along Z +/− | View up / down |
| `A` / `D` | Rotate Z CW/CCW | Orbit left / right |
| `W` / `S` | Rotate Y CW/CCW | Orbit up / down |
| `E` / `Q` | Rotate X CW/CCW | — |
| `+` / `-` | Scale up/down 5% | — |
| `Esc` | Cancel | Exit Fullscreen |
| `F11` | Fullscreen / Exit fullscreen | (same as left) |
| `Del` / `Backspace` | Delete selected objects | — |

✏️ **Practice**: place a cube → select it and press `↑` to watch it "move forward"; clear selection (click empty space) and press `↑` again — now the lens moves forward. Same key, two identities.

### 31.2 Shift combos

> With selection: translate 1 grid (1.5 units) / rotate 90°{br}No selection: pan view 1 grid / rotate 90°

| `Shift` + Key | With Selection | Without Selection |
|---|---|---|
| `↓` / `↑`, `→` / `←`, `PgUp` / `PgDn` | Translate 1 grid | Pan 1 grid |
| `A` / `D`, `W` / `S`, `E` / `Q` | Rotate 90° | Orbit 90° |
| `+` / `-` | Scale ×2 / ×0.5 | — |
| Left Click | Add to selection (click) | (same as left) |

💡 Mantra: **normal keys to get close, Shift to arrive**. First tap arrows to roughly align, then `Shift`+arrow for a 1-grid leap that snaps into place; same for rotation: `A` for 5° to get the feel, then `Shift+A` to fill up to 90° and square it.

---

## Chapter 32 · Slider/Input & Ctrl Combos

### 32.1 Slider / Input

When the cursor is on a slider or numeric input box, the keys below "change that box's number" instead of operating the object — the original shortcuts are **temporarily disabled**. This table is **identical** to "Slider / Input" in `Settings → Quick Operations`.

| Key | Slider | Input |
|---|---|---|
| `→` / `←` | Increase / Decrease | Move cursor |
| `↑` / `↓` | Increase / Decrease | Increase / Decrease |
| `+` / `-` | — | Input sign (+/−) |
| `PgUp` / `PgDn` | Large step up/down | Scroll right panel up/down |

⚠️ To use object shortcuts, first click empty space or the object to move focus off the input box.

### 32.2 Ctrl combos

| `Ctrl` + Key | Combination |
|---|---|
| `A` | Select All |
| `N` | New Scene |
| `O` | Import Scene |
| `S` | Export Scene |
| `P` | Screenshot |
| `Z` | Undo |
| `Y` | Redo |
| `C` | Copy |
| `V` | Paste |
| `D` | Clone |
| `Del` | Clear Scene |

⚠️ `Ctrl + Del` is a "nuclear" operation — deletes all objects at once with **no confirmation dialog**. Back up with `Ctrl + S` before clearing.

### 32.3 Comprehensive practice: build a "little lighthouse" purely by keyboard

Chain this part's lessons into one flow:

1. Drag a **cylinder** from the panel into the scene (only this uses mouse drag — accept it);
2. Select it, press `Shift + PgUp` a few times to raise it to a good "tall" position;
3. `Ctrl + D` to clone one "lamp room", move it to the column top with `PgUp`;
4. `Shift + A` to square the lamp room 90° if needed;
5. `Ctrl + A` to select all, `Ctrl + S` to save;
6. "Front" button to square the view, `Ctrl + P` to screenshot and deliver.

Except for the first shape placement, you barely touch the mouse panel — that's the destination of the "efficiency part": grow hands on the keyboard.

---

✏️ **Part recap**: The essence of shortcuts is "mapping frequent actions to the most natural resting place for your fingers". Remember two main lines — **no selection = move camera, selection = move object**; remember three axes — **X front/back, Y left/right, Z height**; remember one accelerator — **Shift for the big stride**. Next part explains the synergy between the "transform controls (arrows you can drag directly)" and the keyboard, making your operation even smoother.

# Part 9 · Transform

The keyboard was the "precise-step" version of moving things; this part is the "free-drag" version — the transform controls. Mastering them takes your operation from "can move one object" to "can place a whole crowd".

## Chapter 33 · First Transform Controls: Three "Gripping Tools"

### 33.1 When they appear

**Select one object** (click it, selection frame appears) and a set of handles floats at its center — these are the transform controls.

They have 3 "skins" for 3 operations, switched in the right panel's "Transform mode" area (a small block with three square buttons ⇔ ↻ ⤢):

| Mode | Button | Handle shape | Use |
| --- | --- | --- | --- |
| **Translate** | ⇔ | three **arrows** | carry the object |
| **Rotate** | ↻ | three **rings** | turn the object |
| **Scale** | ⤢ | three **squares** (small cubes at corners) | enlarge/shrink |

You enter **Translate** by default. To change mode, click the matching button. On switch, a hint ("Translate/Rotate/Scale") flashes at the bottom.

💡 Tidbit: transform controls and keyboard shortcuts are **two entrances to the same thing** — keyboard is "precise step", controls are "free drag". Mix them: first drag the controls roughly, then nudge with keyboard `↑` a few grids to align. Ch36 covers their synergy.

### 33.2 The "color trap" you must read first

⚠️ **The most important note in this whole part — read this paragraph.**

The three **axis labels** on screen use the "screen-label colors":

- **X = blue = front/back**
- **Y = red = left/right**
- **Z = green = height**

But the transform-control handle colors follow **three.js's code-axis convention** (red = X, green = Y, blue = Z), which does **NOT match** the screen labels! So the handle color you see must be translated like this:

| Handle color | Actual code axis | Matching screen-label axis | Means on screen |
| --- | --- | --- | --- |
| 🔴 Red handle | code X | screen **Y** | **left/right** move / around left-right axis |
| 🟢 Green handle | code Y | screen **Z** | **height** (up/down) move / around height axis |
| 🔵 Blue handle | code Z | screen **X** | **front/back** move / around front-back axis |

> Can't memorize? Remember one line: **red handle = left/right, green handle = up/down, blue handle = front/back** (read by screen labels). Don't be fooled by the surface red/green/blue into mapping them to the scene-axis label colors.

✏️ **Practice (verify)**: select a cube, go to Translate mode. First drag the **red arrow** — the object should slide left/right, not front/back. Then drag the **blue arrow** — it should slide front/back. Etch this table into your brain and every later rotation/scale axis stays correct.

### 33.3 While dragging a handle, can you move the view?

Yes — and that's a very comfortable design of this tool.

- **Left-drag a handle** = operate the object;
- **Right-drag** = rotate the view (camera);
- **Middle-drag** = pan the view;
- **Wheel** = zoom the view.

So you can hold the right button with your left hand to change the angle and see the object's side while continuing to pull the handle with your right hand — view and transform **don't get in each other's way**. No more "exit transform, rotate view, re-enter".

---

## Chapter 34 · Translate Mode: Drag Objects with the Arrow

### 34.1 Three ways to grab

In Translate mode, besides the three axis arrows, the controls offer **two plane blocks** (on the plane spanned by two axes). So there are three grab styles:

1. **Grab a single arrow** (red/green/blue) → constrained to that one axis only; most accurate, won't drift elsewhere;
2. **Grab a plane block** (e.g. the face between red+green arrows) → slides freely within that plane, constrained to those two axes at once;
3. Want to drag completely freely "stuck to the ground, all messy"? Switch to the matching plane first, then drag.

💡 Experience: for precise alignment, always **grab a single arrow**, never the plane — the plane easily slides the object in an unwanted direction.

### 34.2 How to tell the planes apart (with the color trap)

The Translate-mode plane is "the triangular/square region between two neighboring arrows". By the §33.2 translation:

- Plane between red arrow (left/right) + green arrow (up/down) = **left-right × height** plane (the object's "side");
- Plane between green arrow (up/down) + blue arrow (front/back) = **height × front-back** plane (the object's "front/back");
- Plane between red arrow (left/right) + blue arrow (front/back) = **left-right × front-back** plane = **ground** (the plane the object "stands on").

✏️ **Practice**: place an object on the ground, grab and drag the plane block between "red+blue" — it slides stuck to the ground, no rise or sink? That's the most stable "move along the ground" posture.

### 34.3 Learn by comparing with keyboard movement

| Action you want | Control | Keyboard (Ch32) |
| --- | --- | --- |
| Move exactly 0.1 grid front/back | grab **blue arrow** and pull | `↑`/`↓` |
| Move exactly 0.1 grid left/right | grab **red arrow** and pull | `←`/`→` |
| Rise/sink exactly in height | grab **green arrow** and pull | `PgUp`/`PgDn` |
| Big stride 1 grid | pull the arrow hard in controls | `Shift`+arrow |

💡 Trick: **controls are "feel", keyboard is "precision"**. First drag the controls roughly, then nudge with keyboard `↑`/`←`/`PgUp` a few grids to snap onto the grid lines.

---

## Chapter 35 · Rotate Mode: Rings Decide Which Axis to Spin Around

### 35.1 Three rings = rotation around three axes

Switch to Rotate mode (↻) and the object becomes three colored rings; each ring means "spin around that axis".

| Ring color | Code axis | Screen-label axis | Feel (recall Ch32 analogies) |
| --- | --- | --- | --- |
| 🔴 Red ring | code X | screen **Y** (left/right axis) | forward-tumble / lean-back somersault |
| 🟢 Green ring | code Y | screen **Z** (height axis) | turntable / spinning-top in-place spin |
| 🔵 Blue ring | code Z | screen **X** (front/back axis) | topple-left / topple-right roll-over |

⚠️ The ring-color-to-axis mapping also needs §33.2's translation — **red ring = left/right axis, green ring = height axis (most used, for squaring), blue ring = front/back axis**.

### 35.2 Dragging a ring is the same as keyboard A/D/W/S/E/Q

In Ch32 you rotated the object with the keyboard:
- `A`/`D` around the **height axis** (screen Z, vertical);
- `W`/`S` around the **left/right axis** (screen Y);
- `E`/`Q` around the **front/back axis** (screen X).

Mapping to the controls' rings:
- keyboard `A`/`D` ↔ drag **green ring** (height axis);
- keyboard `W`/`S` ↔ drag **red ring** (left/right axis);
- keyboard `E`/`Q` ↔ drag **blue ring** (front/back axis).

✏️ **Practice**: select an object with a "front", `Shift + A` to square it 90° (verify), then switch to Rotate mode and drag the **green ring** — pulling by hand also spins around the same vertical axis, and you can stop at any angle (keyboard only jumps 5°/90°, controls stop at intermediate values). That's exactly the complement.

### 35.3 Free rotation vs precise rotation

- Control ring: stop at **[any angle]** — good for "spin until it looks good";
- Keyboard `Shift`+letter: jump only **[90°]** — good for "must be squared, must be right-angled";
- Keyboard normal letter: step only **[5°]** — good for "a few degrees of fine adjustment".

💡 Practice: first drag the controls to a rough angle → then `Shift+A` (green axis) to fill up to exactly 90°/180°. Most used for work where "squareness" matters, like 3D text and building facades.

---

## Chapter 36 · Scale Mode: Square Handles and the Uniform Switch

### 36.1 Square handles: pull one axis, or inflate the whole

Switch to Scale mode (⤢) and small cube handles appear at the object's corners. Drag a single square = **stretch/squash that one axis only** (e.g. sphere → ellipsoid, column → tall and thin); drag the center square = scale the whole.

| Handle color | Screen-label axis | Effect when pulled |
| --- | --- | --- |
| 🔴 Red square | left/right (Y) | wider / narrower |
| 🟢 Green square | height (Z) | taller / shorter |
| 🔵 Blue square | front/back (X) | deeper / shallower |

### 36.2 The "Uniform scale" lock: the switch beginners should keep on

In the right panel's transform-mode area there is a checkbox **"Uniform scale"** (checked by default). When checked, pulling any square scales the object **uniformly** — no stretch deformation — which is usually what you want.

⚠️ Uncheck it and pull a single square, and the object "single-axis stretches" and deforms. That has creative uses (squashed washer, stretched beam), but beginners easily uncheck by mistake and wonder "why is it distorted". When in doubt, keep it checked.

### 36.3 Compare with keyboard scale, and "no scale in multi-select"

| Want | Control | Keyboard (Ch32) |
| --- | --- | --- |
| Enlarge whole 5% | drag center square (uniform checked) | `+` |
| Shrink whole 5% | drag center square | `-` |
| Double / half | pull center square hard | `Shift`+`+` / `Shift`+`-` |
| Single-axis squash | uncheck uniform, drag one square | not on keyboard |

⚠️ **Important limit**: when **multiple objects are selected at once**, Scale mode is **auto-disabled** (button greys out, and if you were in Scale it auto-returns to Translate). Same reason as the keyboard `+`/`-` multi-select ban — force-scaling objects of different sizes together gets weird.

💡 So how to uniformly resize in multi-select? Two paths: ① first `Ctrl + A` then handle/keyboard individually; ② instead of uniform scale, pre-build a group and place via move rather than scale.

### 36.4 When the transform controls "won't let you"

Besides the multi-select scale ban, the transform-mode buttons sometimes grey out and won't click:

- You're in the **pen / text / eraser** tool mode (these tools take over clicks and yield the controls);
- **While editing text** (inline input open), transform buttons are temporarily disabled, restored when input ends;
- Some **special objects** (image, pen strokes…) simply don't support scale; selecting them auto-hides scale-related controls and disables Scale mode, returning to Translate.

⚠️ If the three mode buttons are stuck grey, first check: are you still in some tool and haven't exited? Press `Esc` or click the top "Select" button to exit the tool and the controls come back.

### 36.5 Controls and number boxes: two-way sync

The right "Transform" area also has matching **sliders/number boxes** (position, rotation angle, scale value). These and the controls are **two-way synced**:

- Drag a control and the number box follows in real time;
- Type an exact value directly into the number box (e.g. rotation `45`, scale `2.5`) and the object changes instantly.

💡 When you need "absolutely exact" (e.g. rotation exactly 30°, scale exactly 1.5×), **typing into the number box** is far more reliable than the control. Controls are for "finding the feel", number boxes for "snapping the value".

---

✏️ **Part recap**: transform controls are the keyboard's "free-drag version". Remember three things — ① three skins (translate/rotate/scale) map to arrows/rings/squares; ② **red handle = left/right, green = up/down, blue = front/back** (always translate by screen labels, don't trust surface colors); ③ left-drag the handle operates the object, right/middle/wheel move the view, the three don't conflict. Next part covers "combining, grouping, aligning and distributing" — moving from "move one object" to "place a whole crowd".

---

# Part 10 · Crowds

> At the end of the last part I promised to explain "combining, grouping, aligning and distributing". Let me confess first: **this tool has no standalone "group" button, nor a one-click align/distribute button** — instead it goes a lighter, more flexible route: **multi-select + transform together + clone arrays**.
>
> This part teaches "how to manage a whole crowd of objects efficiently". There's no silver bullet, but enough "native methods" to line things up just as neatly.

## Chapter 37 · Selecting a Group: Understanding "Selection Sets"

### 37.1 Why multi-select

So far it's been "click one, change one". But real work is usually a pile of things: a row of trees, a row of lamps, a ground full of pebbles. Adjusting 100 one by one, you'd go mad first.

Solution: first pull them all into a **"selection set"** at once and operate uniformly. That's what multi-select means.

### 37.2 Three ways to multi-select

| Method | Operation | Good for |
| --- | --- | --- |
| **Select all** | `Ctrl + A`, or the bottom "Select all" button on touch | select every object in the scene |
| **Add / remove** | hold `Shift` and click objects: click unselected = add; click selected = eject | pick specific ones (e.g. "these 2 lamps + that tree") |
| **Box select** | **hold and drag on empty space**, draw a dashed frame, objects inside are selected at once | a dense crowd, tedious to click one by one |

✏️ **Practice**: scatter 5 shapes. First `Ctrl + A` to light them all → click empty space to deselect → `Shift`-click 2 of them (they dim) → drag a frame on empty space again to box-select the remaining 3. Feel the "selection set" grow and shrink like a stack of sticky notes.

💡 Box-select detail: dragging empty space with the mouse draws a frame. Touch screens have no "drag empty space" concept, so a dedicated "Box select" button was made — when on, a one-finger drag box-selects (and shows "Box select mode" at the bottom while on). If the frame hits nothing, it gently says "box select hit nothing", not a silent failure.

### 37.3 Edge cases of selection

- Click empty space (no drag) = deselect all;
- If the box-select frame is **completely empty**, the selection set clears (like "invert-select to nothing");
- **While editing text** or in the **pen/eraser** tool, selection logic yields to the tool and multi-select is temporarily unavailable.

❓ **Think**: why can `Shift+click` both add and remove? — Because a selection set is not a binary on/off, but a **set**. Click an existing element to remove it, click a missing one to add it. This "toggle" logic recurs everywhere later — file managers, mailboxes.

---

## Chapter 38 · Moving a Group: The Master Pivot of Multi-select

### 38.1 The invisible "master pivot"

When you select **multiple** objects, the tool doesn't attach the controls to any one object (unfair to whichever), but instead places one invisible proxy point (`multiTransformProxy` in code) at the **center** of the crowd.

The transform controls you see (arrows/rings) are actually attached to this "master pivot". Pull it and the algorithm computes the move/rotate **delta** of the master pivot, then **sync-broadcasts it to each selected object**.

> In plain words: **pull one invisible "master switch" and all selected things move together, while their relative positions stay unchanged.**

### 38.2 What multi-select can do

| Action | Available in multi-select? | Note |
| --- | --- | --- |
| Move together (pull arrow/plane) | ✅ | whole crowd moves along an axis |
| Rotate together around the center (pull ring) | ✅ | crowd spins around its group center, like flicking pieces on a board |
| Scale together | ❌ disabled | Scale mode button greys out in multi-select, auto-returns to Translate |

✏️ **Practice**: select 3 scattered objects → Rotate mode → pull the **green ring** (height axis) → they spin around their common center "as if twisted by one hand", spacing unchanged. That's the joy of "group rotation".

### 38.3 Why multi-select can't scale together

⚠️ This is an **intentional limit**, not a bug.

- Uniformly scaling several objects of different sizes/shape usually looks wrong (big ones become huge, small ones become specks);
- So the tool **disables Scale mode directly in multi-select**, pushing you to "shrink individually, or clone first then adjust".

💡 Alternatives:
1. Want a group "all the same size" — first `Ctrl + D` to clone a row of identical ones; they're already same-sized, then fine-tune individually;
2. Really need to scale a whole group — treat them as a "temporary group" and place via **per-object scale + uniform offset**.

### 38.4 Multi-select + Shift big stride, still handy

The `Shift` big stride (1 grid / 90°) from Ch32 **works the same in multi-select**. Select a crowd and hold `Shift` while dragging arrow keys, and the whole crowd jumps 1 grid at once — super handy for array placement (used next chapter).

---

## Chapter 39 · Mass Production: Copy, Clone, and "Arrays"

When making repeats, don't hand-draw the 2nd and 3rd — let the computer birth them with "copy/clone".

### 39.1 Three ways to spawn a copy

| Key | Name | Feature |
| --- | --- | --- |
| `Ctrl + C` | Copy | stores selected object to **clipboard** (doesn't appear immediately) |
| `Ctrl + V` | Paste | takes from clipboard, pastes near the original |
| `Ctrl + D` | **Clone** | one step: copies in place and **auto-offsets slightly** |

💡 **Most used is `Ctrl + D`**. It's one step fewer than "copy → paste", and the clone auto-offsets a bit so it's visible and re-placeable instantly — the staple of arrays.

✏️ **Practice**: place one cube → `Ctrl + D` and one more appears, slightly offset → select the new one → `→` to the next cell → `Ctrl + D` again → `→` again… a row fills in a few tries. No mouse panel touched.

### 39.2 Line up a neat array with "clone + keyboard"

No align/distribute button? Fine — arrange manually using **grid steps** and it lines up just as well.

1. Select an object, `Ctrl + D` to clone;
2. Move it exactly **1 grid** with arrow keys (default step 0.1 grid = 10 presses; or `Shift`+arrow = 1 grid per press);
3. Repeat `Ctrl + D` + arrow → a row emerges;
4. When the row ends, `Ctrl + A` the whole row, `Shift`+arrow to "big-stride the whole row" to the next line, then clone again — a 2D array (square) is possible too.

💡 **Trick for a circle**: clone one → move it a fixed radius from center → rotate the whole group around the center (Ch38) → clone once per angle stepped. A few rotations and a "ring array" appears. That's the manual "distribute".

### 39.3 Edges of copy/paste

⚠️ Two easy missteps (the tool tells you in small text):
- **"Can't copy/clone while transforming"**: while you're pulling a control (transform active), copy/clone buttons are temporarily disabled. Release (end drag) then press — fine.
- **"Select an object before copying"**: pressing `Ctrl + C` with nothing selected tells you to select first. `Ctrl + V` with an empty clipboard also says "clipboard is empty".

❓ **Think**: what's the real difference between clone and copy-paste? — Clone "generates an offset copy in place", independent of any intermediate storage; copy-paste "stores to clipboard first, then retrieves", so you can copy scene A, switch to scene B, and paste (this tool's clipboard is memory-level, works within the same page). Understand this and you'll see why `Ctrl + V` sometimes doesn't respond — the clipboard is probably empty.

---

## Chapter 40 · Export & Share: Taking Work Off-screen

You worked hard on a scene — does it vanish when you close the web page? No. This tool can turn it into a **file via Export**, bring it back via **Import**, and into an **image via Screenshot**.

### 40.1 Three "save/get" keys

| Key | Action | Product |
| --- | --- | --- |
| `Ctrl + S` | export scene | one **JSON file** (full description of the scene) |
| `Ctrl + O` | import scene | read back a previously exported JSON |
| `Ctrl + P` | export image | one **PNG image** (photo of the current screen) |

💡 Workflow: **build a stretch → `Ctrl + S` to save → next day `Ctrl + O` to read back and continue**. JSON is your "project file", PNG is your "result photo" — separate roles.

### 40.2 What's actually inside the JSON

The exported JSON is not an image but a **list of objects**, roughly recording:

- each object's **type/shape** (sphere or text, width/height/depth params);
- each object's **transform** (position, rotation, scale — where it is, how it's skewed, how big);
- each object's **appearance** (color, texture, opacity, texture mapping);
- the scene's **environment settings** (axes, grid-surface show/hide, etc.).

⚠️ What's saved is "parameters", not "pixels", so you can **keep editing after import** — it's a live project, not a dead picture. This also explains why every earlier operation entered the "history stack" and is undoable: essentially they were all changing these parameters.

### 40.3 Sharing and collaboration tips

- **Show a colleague the effect**: send a PNG (`Ctrl + P`) — fastest;
- **Have a colleague continue it**: send a JSON (`Ctrl + S`); they open with `Ctrl + O` and can edit;
- **Across devices**: send JSON to cloud/WeChat, open the web on another PC and import — the scene travels with you;
- ⚠️ Don't overlook that `Ctrl + Del` **clears the whole scene with no confirmation**. Back up with `Ctrl + S` before clearing, so your hard work doesn't evaporate in one click.

### 40.4 Manual "align and distribute": line up even without buttons

Back to the promise at the part's start — no one-click align/distribute, so here are three **purely manual** alignment tricks, combined with what we've learned:

1. **Rely on the grid**: default move step 0.1 grid (= 0.15 units); integer presses = land exactly on grid lines. `Shift`+arrow = 1 grid per press, best for "snapping to grid lines".
2. **Rely on clone**: as in Ch39, clone + fixed step = even-spaced array (that's "distribute").
3. **Rely on the view**: first use the bottom "Front / Top" to square the object to a standard orientation, then move along a single axis with the keyboard to avoid "diagonal arrangement".

✏️ **Comprehensive practice (this part's graduation work)**: with "cube + `Ctrl + D` clone + `Shift`+arrow", line up a 5×3 square, `Ctrl + A` to select all, then `PgUp` to lift the whole crowd 1 grid off the ground, `Ctrl + S` to save. You can now do "mass production + aligned placement + saving the result".

---

✏️ **Part recap**: this tool doesn't rely on "group/align" buttons, but achieves crowd management via **multi-select + proxy master pivot + clone arrays**. Remember — three multi-select methods (select all / Shift add-remove / box select), multi-select can move and rotate but not scale, clone `Ctrl + D` is the array godsend, JSON is your live project file. Next part is **comprehensive practice**: build a complete small scene from zero (small house / small courtyard), chaining all ten parts' skills into one line, and experiencing the last mile of "from beginner to mastery".

---

# Part 11 · Practice: build a complete scene from zero

> In the first ten parts you've met all the "parts": shapes, colors, patterns, text, brush, views, shortcuts, transform controls, multi-select and clone.
>
> But knowing the parts ≠ knowing how to build. This part adds no new buttons; instead it strings what you've learned into an **assembly line** and walks through four complete projects. Each project gives you "goal → breakdown → step-by-step → common pitfalls → advanced challenge".
>
> ⚠️ **Do follow along with your hands.** Watching ten times beats building once — the value of this part lives entirely in your mouse and keyboard.

---

## Chapter 41 · Project 1: build a small house

### 41.1 See the result first, then think about how to break it down

What we're making is plain: a small house with a roof, a door and windows, standing on a lawn.

Don't rush to drag a shape. Spend 10 seconds on a question:

❓ **Think**: a house, if you may only assemble it from "cube, cone, square pyramid, cylinder, plane" — how would you break it down?

This is the core thinking of 3D creation — **break a complex object into a combination of simple geometries**. The pro term is "block analysis", but plainly it's "building with blocks".

Reference breakdown:

| Part | Shape | Why |
|---|---|---|
| Walls (main body) | `box` cube | a house is essentially a box |
| Roof | `pyramid` square pyramid | square base + pointed top, sits neatly on square walls |
| Door | `box` flattened thin slab | stuck on the wall, easier to place than a 2D shape |
| Window | `box` smaller thin slab | same as above; can be made semi-transparent as glass |
| Chimney | `cylinder` cylinder | thin and tall, pokes out from the roof |
| Lawn ground | `square2` square | 2D, lies flat on the ground as turf |

💡 **The trick**: for any model, first ask "how many blocks is it made of". Even for a car or a robot, the思路 is exactly the same.

### 41.2 Step 1: lay the foundation (lawn)

1. Switch the left panel to **2D shapes**, drag a `square2` **square** to the center of the scene;
2. Select it, pick a **green** color in the right panel;
3. Choose the **grid** pattern — from a distance it reads like trimmed lawn;
4. Use **uniform scale** (right-panel slider or `Shift + +`) to enlarge it clearly bigger than the house.

⚠️ **Pitfall**: a 2D shape is a "sticker lying flat on the ground (Z=0)". If you find it "standing up", you probably rotated it by accident with the transform controls — press `Ctrl + Z` to undo, don't force it.

✏️ Quick exercise: press the bottom **Top view** button and check from straight above whether the lawn is big enough; then press **Perspective** to return to the normal view. This habit of "switching views to check" is recommended after every step from here on.

### 41.3 Step 2: raise the walls

1. Switch to **3D shapes**, drag a `box` **cube** to the center of the lawn;
2. Select it, use `PgUp` to lift it so it **sits exactly on the ground** (bottom face flush with ground, not floating, not sunk in);
3. In the right panel change to a **beige / light yellow** (wall color);
4. Choose the **brick** pattern — instantly it turns from "a block" into "a house wall".

💡 **The trick to judging "on the ground"**: press the bottom **Front view** button and look straight from the front — you can tell at a glance whether the object floats or sinks. Perspective view easily fools the eye; front view never lies.

⚠️ **Pitfall**: many beginners adjust height in perspective view and it always feels "off". Switch to front view, solved in two seconds.

### 41.4 Step 3: cap the roof

1. Drag a `pyramid` **square pyramid**;
2. Use `PgUp` to raise it **right above the walls** so the pyramid base just presses on the wall tops;
3. Left/right/front/back not aligned? Nudge with `↑↓←→` (0.1-grid step); for big offsets use `Shift +` arrow to jump a whole grid;
4. Change color to **reddish-brown / dark gray** (tile color).

❓ **Think**: why use a "square pyramid" for the roof instead of a "cone"? — because the walls are square. A square roof on square walls meets edge-to-edge; a cone on square walls leaves the four corners exposed. **Shape matching is the key to "looking right".**

✏️ **Exercise**: deliberately switch to a `cone` once, look from both front and top views, feel the awkwardness of "exposed corners". Then `Ctrl + Z` to switch back.

### 41.5 Step 4: cut the door and windows

The door and windows are made by "**a flattened thin slab stuck on the wall**":

1. Drag a `box`, first **uncheck "uniform scale"** (§36.2), stretch it into a **thin slice**;
2. Re-check uniform scale (to prevent accidental distortion later);
3. Use the arrow keys to push it **against the front face of the wall** — note it must poke out just a tiny bit, otherwise it will "fight" the wall (see pitfall below);
4. Pick a **dark brown** color for the door.

Windows are the same: make two smaller thin slabs, pick **light blue**, and set **opacity around 0.5** — the glass feel appears instantly (§20.2).

⚠️ **Important pitfall: Z-fighting (flickering fight)**
If the door slab and the wall are **exactly coplanar**, you'll see them flicker and intersect each other — this is not a bug, it's two faces "fighting for position" at the same depth.
**Fix**: nudge the door outward a small step with the arrow keys (1–2 presses of 0.1 grid is enough) so it clearly "floats" in front of the wall.

💡 For the second window, don't redraw — select the first, `Ctrl + D` to clone, then use `←` or `→` to move it to the other side. This is the clone array from Ch39 making its first appearance in practice.

### 41.6 Step 5: add the chimney and finish up

1. Drag a `cylinder` **cylinder**, use uniform scale to make it thin, `PgUp` to raise it onto the roof slope so it pokes out a bit;
2. Color **dark gray**;
3. Want more life? Clone a few `sphere` balls, pile them at the chimney mouth as "smoke", and set opacity to 0.3.

**Final checklist** (recommended for every project):

| Check | How |
|---|---|
| Any floating / sunk-in? | press **Front view** and look level |
| Any front/back intersection? | press **Left** or **Right view** |
| Is the overall layout centered? | press **Top view** to overlook |
| Does the result look good? | press **Perspective** to return to normal |

Once confirmed: `Ctrl + S` to export JSON and save the project, `Ctrl + P` to capture a PNG and hand it in.

### 41.7 Advanced challenge

1. **Make a row of townhouses**: select the whole house (`Ctrl + A`) → `Ctrl + D` clone → `Shift +` arrow to move the whole group one grid away → repeat three times. Note that when cloning a multi-selection the relative positions of the group stay unchanged (the "master pivot" mechanism of Ch38).
2. **Change the season**: swap the lawn pattern to "dots" and the color to white → becomes snowy ground; set wall opacity to 0.4 → becomes an igloo.
3. **Add a house number**: use the text tool from Ch21 to add a line "No.1" above the door, font **SimHei (black)**, font size reduced to match the house.

⚠️ Reminder: the default text size is **80**, while a house block is usually only 1–2 units — adding text directly gives a "giant word bigger than the house". You must reduce the font size (or scale the text down as a whole) to make it harmonious. This is the most common frustration for beginners making signs; don't panic, just change the font size.

---

## Chapter 42 · Project 2: make a 3D-look slogan sign

### 42.1 Goal and思路

Make a signboard **standing in the scene**: backboard + text + decoration, e.g. "Welcome" / "Grand Opening" or a phrase you like.

⚠️ First clarify an easy misunderstanding: the text in this tool is a "**thin slab with text on it**" (§21.1), not a real extruded 3D letter with thickness. So the "3D feel" we want comes from the combo of **backboard + text + staggered layers**, not from the text's own thickness.

Once you understand that, the思路 is clear:

| Layer | What | Role |
|---|---|---|
| Backboard | `box` flattened thin slab | gives the text a "support surface" |
| Main text | text object | the content body |
| Shadow text | text object (dark, stepped back a bit) | fakes the thickness illusion |
| Stand | two `cylinder`s | makes the sign "stand" on the ground |

### 42.2 Step 1: make the backboard

1. Drag a `box`, uncheck "uniform scale", flatten it into a **vertical thin slab** (width > height > thickness);
2. Re-check uniform scale;
3. Use `PgUp` to lift it to eye height (some distance off the ground, not stuck to it);
4. Pick a **dark color** (dark blue / dark green / wood all work) — dark base with light text is clearest.

💡 **Color principle**: text and backboard must have a **lightness difference**. Dark base + light text, or light base + dark text, pick one. Same-lightness pairings (e.g. mid-gray base + mid-green text) blur into a mush from afar — the most basic yet most overlooked rule in design.

### 42.3 Step 2: lay down the text

1. Left panel "Tools" → "**Add Text**";
2. Click once in the scene, a input box pops up (placeholder "Enter text······");
3. Type your slogan, press **Enter** to confirm;
4. Select it, adjust in the right panel:
   - **Font**: "SimHei (black)" for modern, "KaiTi (script)" for traditional;
   - **Font size**: default 80, usually needs to be **reduced** to match the blocks (see the reminder in 41.7);
   - **Bold**: recommended for slogans, more eye-catching from afar;
   - **Color**: pick a light color with strong contrast to the backboard.

5. Use arrow keys to move the text to the **front** of the backboard, and remember to poke it out a bit (avoid Z-fighting, same as §41.5).

✏️ **Exercise**: after typing, **double-click** it (§21.3) and change the content to another sentence. Feel the convenience of "no need to delete and redo" — very handy when iterating copy back and forth.

### 42.4 Step 3: make "shadow text" for thickness

This is the core trick of the chapter — simple yet highly effective:

1. Select the main text, `Ctrl + D` to **clone** a copy;
2. Change this clone to a **dark color** (a bit darker than the backboard, or pure black);
3. Use arrow keys to move it **back and down 1–2 small steps** (0.1-grid step is enough);
4. If it covers the main text, the front/back relation is reversed — just move the main text one more step forward.

Now from perspective view: dark text behind, bright text in front, **visually it "floats"**. This is the "drop shadow" trick from graphic design, and it works in 3D too.

❓ **Think**: why does "back + down" offset work better than "back only"? — because in reality light usually comes from **above**, so the shadow naturally falls **below and behind** the object. An offset that matches everyday lighting experience makes the brain believe it's "real".

💡 Want stronger 3D? Clone the shadow text **two or three more times**, each stepped back a bit further, color gradually darkening — that becomes a "multi-layer extrusion" fake-thickness effect. More layers = heavier, but also easier to blur; around 3 layers is the sweet spot.

### 42.5 Step 4: add the stand so the sign stands

1. Drag two `cylinder` **cylinders**, use uniform scale to make them thin and long;
2. Use `PgUp` / arrow keys to insert them **under both sides of the backboard**, with the top end sunk a bit into the backboard (here **intentional intersection** is correct, it hides the seam);
3. Color **dark gray / wood**.

💡 Don't drag the second post again — select the first, `Ctrl + D` clone, then `←` / `→` to move to the other side. **Symmetric things are always cloned, forever more accurate than placing by hand.**

### 42.6 Step 5: horizontal vs vertical layout

The same sentence, a different layout, totally different vibe:

| Combo | Vibe | Fits |
|---|---|---|
| Horizontal + SimHei + bold | modern, commercial | shop sign, event banner |
| Vertical + KaiTi + large size | traditional, solemn | plaque, academy, tea house |
| Horizontal + Times + not bold | western, formal | English sign, info board |
| Horizontal + Courier | technical, retro | tech feel, typewriter style |

✏️ **Exercise (comparison test)**: make two versions of the single word "茶" (tea) — one horizontal SimHei, one vertical KaiTi large size + wood backboard. Place them side by side in the scene, look from **Front view**. You'll intuitively feel: **the font and layout themselves speak** — before the content even changes, the vibe is already worlds apart.

### 42.7 Common pitfalls summary

| Symptom | Cause | Fix |
|---|---|---|
| Text absurdly large, covers whole scene | default font size 80, mismatched with block scale | reduce font size, or scale the text object as a whole |
| Text and backboard flicker/intersect | coplanar (Z-fighting) | nudge text out 1–2 steps with arrow keys |
| Blurs into one from afar | not enough lightness difference between text and backboard | increase contrast, or bold the text |
| Text exceeds backboard edge | copy too long | reduce font size, or widen the backboard |
| Can't change font size / arrow keys dead | cursor still in the number input box | click blank space in the canvas first (§32.5) |

### 42.8 Advanced challenge

1. **Make a two-sided sign**: select the whole group (backboard + text + shadow) and clone, use `Shift + A` to rotate 180°, place on the back, making a standing sign readable from both sides.
2. **Glowing text effect**: set the main text to bright yellow, the backboard to deep black, then place a semi-transparent (opacity 0.3) light-yellow thin slab behind the text as a "halo".
3. **Link with Project 1**: place this sign in front of the small house from Ch41, `Ctrl + S` to save as one complete scene. You now have a complete small view of "house + sign".

---

## Chapter 43 · Project 3: design a logo / icon

### 43.1 Why a logo is the "best exercise"

The first two projects made "3D things". This one flips it — we make a logo that **looks like flat graphic design**, but built with 3D means.

It's an excellent exercise because:
- It's done with **2D shapes** only (the 20 from Ch12), low shape burden;
- It forces you to think about real design issues: **alignment, layers, color**;
- The result, captured from **Top view**, is a clean icon, directly usable as an avatar / Logo.

❓ **Think**: the logos you've seen (car badges, school crests, app icons) — how many elements do they usually consist of? — usually no more than 3–4 layers: base shape + main figure + accent + text. **Less is refined** — the iron rule of logo design.

### 43.2 Key premise: work in top view

⚠️ For this project, please **operate entirely in Top view** (bottom view button).

Reason: a logo is a "look at the front" flat composition, and all 2D shapes lie flat on the ground (Z=0). Looking straight down from above, you see exactly the finished product; in perspective view there's near-big-far-small distortion, and alignment becomes guesswork.

💡 This is a general lesson: **do what you do, view it from that view.** Ground layout → top view; adjust height → front view; overall effect → perspective. Don't force one view through the whole process.

### 43.3 Step 1: base shape (outermost layer)

1. Left panel switch to **2D shapes**, pick one as the base:
   - `circle2` circle → round badge, most versatile;
   - `hexagon` hexagon → tech / industrial feel;
   - `octagon` octagon → steady, emblem feel;
   - `pentagon` pentagon → shield, academy feel.
2. Place at the **center** of the scene;
3. Uniform-scale up to a suitable size;
4. Pick a **dark color** (dark blue / dark green / wine red all pop).

### 43.4 Step 2: inner layer and main figure (build layers)

A logo's refinement comes 80% from "**concentric layers**".

1. Select the base shape, `Ctrl + D` to **clone** a copy;
2. Uniform-scale the clone **down** (press `-` a few times, or `Shift + -` to halve);
3. **Key**: use `PgUp` to lift it **a small step** — let it float just above the base shape;
4. Switch to a **light color** (white / cream / bright gold).

Now you have a "dark outer ring + light inner core" concentric structure.

⚠️ **The pit you must step in**: if both 2D shapes sit at Z=0, they'll flicker and intersect wildly (Z-fighting again, covered in §41.5). **When stacking 2D shapes, each layer must be lifted a small step with `PgUp`**, separating them in height. This is the most important operational discipline of the chapter.

💡 Remember the mantra: **every layer you stack, lift a step.** Three shapes = three different heights.

Then place the main figure (the logo's "protagonist"):

| Want to express | Which 2D shape |
|---|---|
| Honor, rating | `star` five-pointed star |
| Love, charity | `heart` heart |
| Energy, speed | `lightning` lightning |
| Medical, aid | `cross` cross |
| Direction, logistics | `arrow` arrow |
| Nature, water | `teardrop` teardrop |
| Night, quiet | `crescent` crescent |
| Tech, connection | `hexagon` hexagon |

Place it, lift a step, set to a contrasting color, center-align.

⚠️ Note: `heart / arrow / crescent / cross / lightning` have **no independent shape-parameter controls** (§12.2); to resize them you can only use **uniform scale** or the transform controls. This is not a fault — they simply have no adjustable parameters.

### 43.5 Step 3: how to align to center

This tool has **no "one-click center" button** (stated in Part 10), yet a logo cares most about alignment. Three manual alignment tricks:

1. **Rely on the grid**: in top view, the ground grid lines are your ruler. Align each layer's center to the **same grid intersection**, fine-tune with arrow keys (0.1 grid).
2. **Rely on clone**: a cloned copy **only uniform-scales, doesn't translate**, so its center stays in place — naturally concentric. This is the laziest trick, strongly recommended.
3. **Rely on the number box**: the position number box in the right panel (§36.5) lets you type directly. Fill each layer's horizontal position with the **same set of numbers** for absolutely precise centering.

💡 **Best practice**: trick 2 + trick 3 combined. Clone first to guarantee concentricity, then use the number box to double-check the numbers match. A hundred times more reliable than dragging the mouse.

### 43.6 Step 4: add text ring / bottom text

1. "Add Text", type the brand name or year;
2. **Reduce** font size (text in a logo is usually tiny);
3. Font: "SimHei (black)" for modern, "Times" for academic, "SimSun (song)" for traditional;
4. Lift to the **top layer** (one step above all shapes);
5. Place at the bottom of the logo or in the middle blank.

⚠️ This tool's text **cannot be arranged along an arc** (no "circular text"). For a similar effect you'd have to split the text into single characters, clone and rotate each one into place — very laborious. Beginners are advised to just use **horizontal text at the bottom**, equally professional.

### 43.7 Step 5: export the image

1. Press **Top view**, center the logo in the frame;
2. If needed press `F11` for fullscreen, bigger and cleaner;
3. Want to remove distractions? Hide the axes and grid surface (Ch28) — this step is crucial, otherwise the screenshot will have grid lines;
4. `Ctrl + P` to capture and export PNG;
5. `Ctrl + S` to save a JSON project for easy recoloring later.

💡 **The export trio**: top view + hide helpers + fullscreen. Use this whenever you need a "clean final image".

### 43.8 Color cheat sheet (take it and use it)

| Style | Base | Inner | Main figure | Text |
|---|---|---|---|---|
| Business steady | dark blue | white | dark blue | white |
| Natural eco | dark green | cream | green | cream |
| Lively sport | bright orange | white | dark gray | white |
| High-end luxury | pure black | gold | gold | gold |
| Medical health | white | light blue | red cross | dark blue |

⚠️ The most common color mistake for beginners is **too many colors**. Keep a logo within **2–3 colors** and it instantly looks professional. To enrich layers, rely on **shades of the same hue** (§18.2: fix the hue bar, only drag up/down in the big color block), not on adding more colors.

### 43.9 Advanced challenge

1. **Make a series of icons**: select the whole logo and clone three copies, only change the main figure (star / heart / lightning), leave everything else untouched. You get a set of stylistically consistent icons — exactly how real brand design works.
2. **Add an embossed feel**: clone the main figure in a dark color, offset it one step to one side, place it one layer below (i.e. the "shadow text" trick from §42.4 applied to shapes).
3. **Make a physical badge**: under the whole logo place a flat `cylinder`, switch back to perspective — the flat logo instantly becomes a "metal badge you can hold in your hand".

---

## Chapter 44 · Project 4: comprehensive scene "My Little Courtyard"

### 44.1 This chapter is the "graduation project"

The first three projects each practiced a skill: **block assembly** (house), **text layout** (slogan), **flat composition** (logo). This chapter **combines them all into one scene**, plus the remaining skills — brush, image, semi-transparency — to make a complete work.

Goal: a **cottage with a yard** — house, fence, path, trees, pond, nameplate, sky atmosphere, all in one.

⚠️ This is the longest exercise in the book; it's recommended to **do it in several sittings**, saving with `Ctrl + S` after each part. The habit of "periodic saving" is worth more than any trick.

### 44.2 Creative flow: big before small, settle before decorate

The biggest difference between a pro flow and a beginner's is not hand speed, but **order**. Please follow this order strictly:

| Stage | Do what | Why this order |
|---|---|---|
| ① Set the ground | lay lawn, define yard range | first mark the "stage", so there's a reference later |
| ② Place the主体 | put the house (result of Project 1) | place the biggest object first, it decides overall scale |
| ③ Divide zones | draw the path with the brush | plan functional areas on the empty ground |
| ④ Add mid pieces | trees, pond, fence | fill medium volume, enrich layers |
| ⑤ Add small pieces | stones, flowers, nameplate | details last, avoid early distraction |
| ⑥ Tune atmosphere | color, opacity, view | unify the tone, finish and export |

❓ **Think**: why "details last"? — because details **distract your judgment of the whole**. With a pile of small stones there, it's hard to see if the house position is right. Set the big relationships first, then details matter. In painting it's called "whole to局部", same in 3D.

### 44.3 ① Lay the ground

1. 2D shape drag a `square2` square, enlarge into the yard ground;
2. Green + "grid" pattern = lawn;
3. Switch to **Top view**, confirm the range is big enough — **rather bigger**, because you'll keep adding things and a small space is hard to fix later.

💡 Suggest laying another bigger light-color base plate on the outermost ring (remember to `PgDn` it one step **below** the lawn, to avoid coplanar flicker), as "the open ground outside the yard" — the picture gains a sense of boundary.

### 44.4 ② Place the house

Directly reuse the result of Ch41:

- If you saved the project, `Ctrl + O` to import it;
- If not, rebuild it per 41.2–41.6 (this time much faster).

Placement suggestion: **don't put it dead center**. Place the house **toward the back and to one side** of the yard, leaving a large open space in front — this composition is more natural, and leaves room for the path and pond.

💡 **Composition tidbit**: placing the主体 dead center looks stiff; offset slightly from center looks more alive. In photography it's called the "rule of thirds"; you can use the ground grid lines to estimate position.

### 44.5 ③ Draw the path with the brush

This is the classic use of the brush tool (Ch24) in practice:

1. Left panel "Tools" → **2D brush**;
2. Set a good color (earth yellow / light gray) and line width (thicker, like a road);
3. Drag from the yard entrance to the house door, draw a **slightly curved** line;
4. Exit the brush tool when done (press `Esc` or switch back to select).

⚠️ **Two disciplines of the brush**:
1. A brush stroke, once drawn, is "fixed" there, **cannot be fine-tuned like a shape** — if you draw it crooked, `Ctrl + Z` to undo and redraw, don't try to fix it;
2. A brush stroke **doesn't support scaling** (§36.4); when you select it, scale mode is disabled and auto-switches to translate.

💡 Why should the path be "slightly curved" instead of straight? — a straight line looks like a blueprint, a curved line looks like life. This tiny detail makes the scene instantly "human".

✏️ **Exercise**: first draw a straight road, look; `Ctrl + Z` to undo, then draw a curved one, compare the feel. This "make two versions and compare" method is the fastest way to improve aesthetics.

### 44.6 ④ Add trees, pond and fence

**Trees** (two-stage):
1. `cylinder` cylinder thin and long → trunk, dark brown;
2. `sphere` sphere → canopy, green, `PgUp` to put on top of the trunk;
3. Select trunk and canopy (`Shift` to add to selection, both selected) → `Ctrl + D` to clone the whole tree → move elsewhere.

💡 Here we use the key mechanism of Ch38: **when cloning a multi-selection, the relative position of the two parts stays unchanged**, so what you copy is "one complete tree", not scattered. To plant a row of trees, just repeat "clone + `Shift +` arrow".

⚠️ Don't make all trees exactly the same size — after cloning, casually give each a 5%-ish size difference with `+` / `-`, and the natural feel comes immediately. **Regularity with a bit of randomness is the secret to making a scene look real.**

**Pond**:
1. 2D shape `ellipse` or `circle2` circle, lying flat on the ground;
2. `PgUp` to lift **a small step** (don't be coplanar with the lawn);
3. Light blue color, "**wave**" pattern;
4. **Set opacity to 0.6** — the semi-transparent water feel appears (§20.2).

**Fence** (textbook use of clone array):
1. `box` flattened into a long thin vertical slab → one rail;
2. `Ctrl + D` clone → `Shift +` arrow to move a whole grid → `Ctrl + D` again → move again……
3. Repeat until one side is filled;
4. After that side, `Shift` to select the whole row → `Ctrl + D` to clone the whole row → use `Shift + A` to rotate **90°** → move to the other side of the yard.

💡 Step 4 is the culmination of the first ten parts: **multi-select + clone + rotate whole group 90°**, three skills used at once. After this step, you can basically say you've "graduated".

### 44.7 ⑤ Add detail pieces

- **Stones**: `sphere` or `dodeca` dodecahedron shrunk, clone a few scattered on both sides of the path, gray tones but **varied light/dark**;
- **Flowers**: `star` five-pointed star (2D) or small balls, bright color, dotted on the lawn;
- **Nameplate**: a shrunk version of the slogan sign from Ch42, hung at the door, with the house number;
- **Photo wall**: use "Add Image" to place one of your own pictures (Ch23) as a display board in the yard.

⚠️ Details must be **restrained**. Stop when it looks "rich but not messy". Test: switch to **Top view** and overlook; if you can't tell the primary from the secondary at a glance, you've added too much — delete some.

### 44.8 ⑥ Tune atmosphere and export

**Unify the tone** (the step that most improves quality):

| Desired atmosphere | How |
|---|---|
| Morning | overall lighter, cooler (light blue, cream), slightly higher opacity |
| Dusk | overall warmer (orange, brown, gold), deepen the shadow-side color |
| Fairy tale | high saturation (pink, cyan, bright yellow), "dots" pattern |
| Minimal | only black/white/gray + one accent color |

💡 Use the trick from §18.2 to unify tone: **keep the hue bar fixed, only change lightness and saturation**, and the whole scene's colors automatically "harmonize". This is the easiest and most effective coloring method.

**Export flow** (same as §43.7):
1. Try all 7 views at the bottom, pick the best looking one (usually "Perspective" with a slight downward angle);
2. Hide axes and grid surface (Ch28), the picture is instantly clean;
3. `F11` fullscreen;
4. `Ctrl + P` screenshot;
5. `Ctrl + S` save project.

✏️ **Last exercise**: capture **three images of the same scene from different views** — top view (plan layout), front view (elevation), perspective (render). This is exactly the standard trio architects deliver. You can already do it.

### 44.9 Self-check list when stuck

When building a big scene it's easiest to "get messier and messier". When stuck, self-check by this table:

| Symptom | Mostly because | How to rescue |
|---|---|---|
| Getting messier, don't know what to do | didn't follow "big before small" | stop, switch to top view to see the whole, fix the big pieces first |
| Things intersect and flicker | coplanar (Z-fighting) | use `PgUp`/`PgDn` to separate the layers |
| Scale off, something especially big | no reference object | place a known-size object as a "ruler", adjust the rest to it |
| Colors messy, look cheap | too many color kinds | cut to within 3 colors, use shades for layers |
| Can't select the object you want | blocked by another object | switch view and click again, or move the blocker away first |
| Arrow keys suddenly don't move the object | not selected / cursor in input box | see §32.5 troubleshooting trio |
| Everything gone by accident | mis-touched `Ctrl + Del` to clear | `Ctrl + Z` to undo; save first next time |

### 44.10 Closing words: from "can use" to "can make"

Look back at your journey:

- In Part 1 you were still asking "what is 3D";
- In Part 5 you learned to make the scene speak;
- In Part 8 your hands left the mouse;
- In Part 10 you could command a crowd of objects at once;
- Now, you independently built a cottage with a yard.

The tool's buttons are limited (20 3D + 20 2D + 12 patterns + 8 fonts), but **combinations are infinite**. What truly decides the height of a work was never how many buttons you know, but:

1. **Decomposition ability** — seeing a complex object as a combination of simple geometries;
2. **Sense of order** — big before small, settle before decorate;
3. **Aesthetic judgment** — knowing when to stop.

These three, the four projects of this part keep training. The rest is up to practice.

💡 **Suggestion for your next step**: find a photo you like (a room, a street corner, a toy), and try to "recreate" it with this tool. It's fine if it doesn't look like it — **at the places where it doesn't look like it, you'll meet problems that are truly your own**, and that's where progress begins.

---

✏️ **Part recap**: the four projects correspond to four abilities — the house trains **block decomposition**, the slogan trains **text layout and fake 3D**, the logo trains **layer alignment and color**, the courtyard trains **complete flow and coordination**. Three iron rules throughout: **Z-fighting → lift a step**, **symmetry/repeat → use clone**, **do what you do → view it from that view**. The next part is the book's last: troubleshooting manual, glossary, shortcut cheat sheet and index, as your on-hand reference for future creation.

---

# Part 12 · Troubleshooting and appendix

> This part is a "reference book", not meant to be read from start to finish, but to be **flipped to when stuck**.
>
> If in any earlier part you meet "huh, why is this wrong", first flip to Ch45's troubleshooting table; for a word's meaning flip to Ch46; for a forgotten shortcut flip to Ch47; to confirm what a shape/pattern/font is called and looks like, flip to Ch48.
>
> The three tables (troubleshooting, shortcuts, index) are recommended to be **bookmarked or printed**, kept at hand while creating.

---

## Chapter 45 · Common problems troubleshooting manual

The table below is arranged by "what you see → mostly the cause → how to rescue". Most problems are traceable; don't rush to suspect a bug.

| # | Symptom | Mostly the cause | Solution |
|---|---|---|---|
| 1 | Arrow keys, `+`/`-` don't affect the object | object not selected, or cursor stuck in the right-panel number input box | click blank space in canvas first, ensure object is selected and input box lost focus (§32.5) |
| 2 | Two faces flicker, intersect each other | two faces coplanar (**Z-fighting**) | use `PgUp`/`PgDn` to lift/lower one face a step apart (§41.5, §43.4) |
| 3 | Text absurdly large, covers whole scene | default text size **80**, far bigger than block scale | reduce font size, or scale the text object as a whole (§21, §41.7, §42.3) |
| 4 | Changed font size, arrow keys dead | cursor still in the number input box, not out | click blank space in canvas to blur the input box (§32.5) |
| 5 | `Ctrl+C`/`Ctrl+D`/`Ctrl+V` no response | transform controls active, or object not selected | press `Esc` to exit transform controls first, then select object (§33, §39) |
| 6 | Multi-select `+`/`-` rejected | overall scaling **forbidden in multi-select** (prompt "NoScaleMulti") | cancel multi-select and scale one by one, or drag handle with transform controls (§36.4) |
| 7 | Scale disabled after selecting a brush stroke | brush stroke **doesn't support scaling**, auto-switches to translate | to change size you must redraw (§24, §36.4) |
| 8 | Drew brush/shape crooked, want to change shape | brush stroke is fixed once drawn, can't fine-tune like a shape | `Ctrl+Z` to undo and redraw (§24, §44.5) |
| 9 | Want to center but no "center" button | this tool **has no one-click center** | three tricks: grid, clone concentric, number box (§43.5) |
| 10 | Text along an arc (circular text) impossible | this tool **doesn't support circular text** | use horizontal text at bottom, or split into single chars and rotate each (§43.6) |
| 11 | Some 2D shapes (heart/arrow/crescent/cross/lightning) have no "shape parameter" slider | they **themselves have no independent adjustable parameters** | only uniform scale or transform controls to resize (§12.2, §43.4) |
| 12 | Accidentally deleted whole scene or important content | slipped `Delete`, or cleared the scene | immediately `Ctrl+Z` to undo; and build the habit of periodic `Ctrl+S` (§44.1) |
| 13 | Import JSON prompts "load failed" | file corrupted, or not the format exported by this tool | confirm using this tool's `Ctrl+S` exported `.json` (Ch6) |
| 14 | View button not lit, camera goes dark after rotating | after free rotate the "perspective" button goes dark (normal) | click a view button to re-align (Ch28) |
| 15 | Desktop wants box-select but can't select | box-select is a **touch-only** mode | on desktop use `Shift` add-select, or `Ctrl+A` select all (Ch7) |
| 16 | Changed global color, but one object didn't change | that object has an **independent color override**, or is in "no color" state | select it and change color separately (Ch18) |
| 17 | Screen eyedropper unusable | didn't activate the eyedropper tool first | click the eyedropper button in the color area first, then pick (Ch18) |
| 18 | Screenshot has grid lines / axes | didn't hide helper elements | hide axes and grid surface then `Ctrl+P` (§28, §43.7) |
| 19 | Cloned object "fell apart" | didn't select the whole group before multi-select clone | use `Shift` to select the entire combo then `Ctrl+D` (Ch38) |
| 20 | Rotated view/object direction reversed | mixed up axes: `A/D` around Y, `W/S` around X, `Q/E` around Z | press against Ch47 cheat sheet, or `Shift`+arrow for big angles (§32, §34) |

💡 **First-principle of troubleshooting**: 90% of "something's off" has only three root causes — **not selected**, **cursor in input box**, **two faces coplanar**. Recite these three first, then check the table by symptom, saves half the time.

---

## Chapter 46 · Glossary (Chinese-English)

A vocabulary list for quick lookup. Entries with `*` are terms specific to this tool.

| Chinese | English / abbreviation | One-line explanation |
|---|---|---|
| Grid unit* | GRID_UNIT | the length of one ground cell, also the base of move step (0.1 cell / 1 cell) |
| Z-up* | Z-up | this tool uses Z axis as "up", unlike most 3D software that use Y as "up" |
| Coplanar flicker | Z-fighting | two faces at the same depth fighting for position, causing flicker/intersection |
| Block analysis | block analysis | the思路 of breaking a complex object into a combination of simple geometries (block-building thinking) |
| Uniform scale | uniform scale | lock width/height/depth ratio to scale together, preventing distortion |
| Selection set* | selection set | the currently selected group of objects (formed by `Shift` add-select) |
| Master pivot* | master pivot | the common control center of the whole group during multi-select transform (Ch38) |
| Clone | clone | copy an identical object (`Ctrl+D`) |
| Array* | array | regularly repeated clone arrangement (multiple `Ctrl+D` + arrow keys) |
| Transform controls | transform controls | the three "grip tools" in the scene: arrow / ring / box handles |
| Translate mode | translate mode | drag the object around with the arrow |
| Rotate mode | rotate mode | use the ring to decide which axis to rotate around |
| Scale mode | scale mode | use the box handle to enlarge/shrink |
| Pattern / texture | pattern / texture | the 12 procedural textures on the object surface (not external images) |
| Opacity | opacity | 0 = fully transparent, 1 = fully opaque; semi-transparent for water, glass, halo |
| Wireframe | wireframe | display mode showing only the skeleton lines, not filling the surface |
| View / camera | view / camera | 7 preset positions: perspective / top / bottom / front / back / left / right |
| Brush stroke* | brush stroke | the fixed line drawn by the brush tool, not fine-tunable or scalable after drawing |
| Screen eyedropper | eyedropper | pick a color from anywhere on the canvas |
| History stack | history stack | the operation log that undo/redo relies on (Ch10) |

---

## Chapter 47 · Shortcut cheat sheet

> All shortcuts are **case-insensitive**; `Ctrl` on Mac is `Cmd`.
> Note: as long as the cursor is in an input/dropdown box, shortcuts fail — this is browser behavior, not a bug (§32.5).

### 47.1 Mouse operations (desktop)

| Operation | Description |
|---|---|
| Left Click | Select object / control |
| Double Left Click | Edit text |
| Long Press Left | Manipulate object / control |
| Long Press Right | Orbit view |
| Long Press Middle | Pan view |
| Scroll Wheel | Zoom view |

### 47.2 Gesture operations (mobile / tablet)

| Operation | Description |
|---|---|
| Single Tap | Select object / control |
| Double Tap | Edit text |
| Long Press Object | Toggle add/remove selection (Shift+click equivalent) |
| Drag Object | Manipulate object / control |
| Drag Blank Area | Orbit view |
| Tap Blank Area | Deselect all |
| "Select All" Button | Select all objects |
| "Box Select" Button | Enable single-finger drag to box-select objects |
| Two-Finger Drag | Pan view |
| Pinch Gesture | Zoom view |

### 47.3 Single keys

> With selection: translate 0.1 grid (0.15 units) / rotate 5°{br}No selection: pan view 0.1 grid / rotate 5°

| Key | With Selection | Without Selection |
|---|---|---|
| `↓` / `↑` | Move along X +/− | View back / forward |
| `→` / `←` | Move along Y +/− | View right / left |
| `PgUp` / `PgDn` | Move along Z +/− | View up / down |
| `A` / `D` | Rotate Z CW/CCW | Orbit left / right |
| `W` / `S` | Rotate Y CW/CCW | Orbit up / down |
| `E` / `Q` | Rotate X CW/CCW | — |
| `+` / `-` | Scale up/down 5% | — |
| `Esc` | Cancel | Exit Fullscreen |
| `F11` | Fullscreen / Exit fullscreen | (same as left) |
| `Del` / `Backspace` | Delete selected objects | — |

### 47.4 Shift combos

> With selection: translate 1 grid (1.5 units) / rotate 90°{br}No selection: pan view 1 grid / rotate 90°

| `Shift` + Key | With Selection | Without Selection |
|---|---|---|
| `↓` / `↑`, `→` / `←`, `PgUp` / `PgDn` | Translate 1 grid | Pan 1 grid |
| `A` / `D`, `W` / `S`, `E` / `Q` | Rotate 90° | Orbit 90° |
| `+` / `-` | Scale ×2 / ×0.5 | — |
| Left Click | Add to selection (click) | (same as left) |

### 47.5 Slider / Input

> Effective when slider or input is focused; arrow keys are temporarily remapped.

| Key | Slider | Input |
|---|---|---|
| `→` / `←` | Increase / Decrease | Move cursor |
| `↑` / `↓` | Increase / Decrease | Increase / Decrease |
| `+` / `-` | — | Input sign (+/−) |
| `PgUp` / `PgDn` | Large step up/down | Scroll right panel up/down |

### 47.6 Ctrl combos

| `Ctrl` + Key | Combination |
|---|---|
| `A` | Select All |
| `N` | New Scene |
| `O` | Import Scene |
| `S` | Export Scene |
| `P` | Screenshot |
| `Z` | Undo |
| `Y` | Redo |
| `C` | Copy |
| `V` | Paste |
| `D` | Clone |
| `Del` | Clear Scene |

---

## Chapter 48 · Shapes · patterns · colors index

All the "material parts" of this tool are here. Coloring uses **preset palette + custom picker** (Ch18); there's no fixed "color list" itself, so here we only list shapes, patterns, fonts and views, with usage advice for color.

### 48.1 20 kinds of 3D shapes

| # | Internal id | Chinese name | Typical use |
|---|---|---|---|
| 1 | `box` | cube | wall, slab, house body, steps — universal base body |
| 2 | `sphere` | sphere | canopy, planet, marble, head |
| 3 | `cylinder` | cylinder | pillar, jar, trunk, chimney, stand |
| 4 | `cone` | cone | spire, ice cream, road sign, beacon |
| 5 | `torus` | torus | donut, tire, ring, bracelet |
| 6 | `knot` | knot | trefoil art shape, decoration |
| 7 | `icosa` | icosahedron | polycrystal, sci-fi dice |
| 8 | `octa` | octahedron | bicone gem, crystal |
| 9 | `dodeca` | dodecahedron | dodeca crystal, ornament |
| 10 | `capsule` | capsule | pill, joint, round-headed column |
| 11 | `pyramid` | square pyramid | pyramid, roof (square roof on square walls) |
| 12 | `prism` | triangular prism | triangular column, wedge, slope |
| 13 | `tube` | tube | bent pipe, hose, track |
| 14 | `lathe` | lathe/revolution | vase, bowl, bottle (turned revolution body) |
| 15 | `tetra` | tetrahedron | four-corner pyramid, shard, crystal chip |
| 16 | `barrel` | barrel | wooden barrel, wine barrel, drum |
| 17 | `dome` | hemisphere | dome, bowl lid, radome |
| 18 | `helix` | helix ring | spring, spiral staircase, DNA feel |
| 19 | `octaPrism` | octagonal prism | octagonal column, lighthouse, pavilion column |
| 20 | `star3d` | 3D star | 3D star decoration, medal |

💡 Among the 20, `box / sphere / cylinder / cone / pyramid` are the主力 of "block decomposition" (Ch41); the rest are mostly for decoration and accent.

### 48.2 20 kinds of 2D shapes (lying flat on ground, as sticker/plane)

| # | Internal id | Chinese name | Note |
|---|---|---|---|
| 1 | `square2` | square | lawn, base plate, most used |
| 2 | `circle2` | circle | base, pond |
| 3 | `triangle` | equilateral triangle | |
| 4 | `star` | star (five-pointed) | |
| 5 | `hexagon` | regular hexagon | tech/industrial base shape |
| 6 | `heart` | heart | ⚠️ no independent shape param, only scale |
| 7 | `pentagon` | regular pentagon | shield/academy feel |
| 8 | `octagon` | regular octagon | steady emblem feel |
| 9 | `ellipse` | ellipse | pond, lens |
| 10 | `parallelogram` | parallelogram | |
| 11 | `trapezoid` | trapezoid | |
| 12 | `diamond` | diamond | |
| 13 | `rightTri` | right triangle | |
| 14 | `arrow` | arrow | ⚠️ no independent shape param |
| 15 | `crescent` | crescent | ⚠️ no independent shape param |
| 16 | `semicircle` | semicircle | |
| 17 | `ring2d` | ring (2D) | different from 3D `torus`, this is a flat ring |
| 18 | `cross` | cross | ⚠️ no independent shape param |
| 19 | `lightning` | lightning | ⚠️ no independent shape param |
| 20 | `teardrop` | teardrop | |

⚠️ No. 6, 14, 15, 18, 19 (heart/arrow/crescent/cross/lightning) **have no independent shape-parameter control**; to resize only uniform scale or transform controls (§12.2, §43.4). The other 2D shapes can additionally adjust "sides/angle" etc.

### 48.3 12 kinds of patterns (textures)

| # | Chinese name | Fits scene |
|---|---|---|
| 1 | solid | default, clean no texture |
| 2 | grid | lawn, floor tile, chessboard |
| 3 | stripe | cloth, awning, flag |
| 4 | dots | polka-dot decor, snowy ground (white + dots) |
| 5 | gradient | sky, background, light feel |
| 6 | brick | wall (used in house Ch41) |
| 7 | diagonal | warning, speed feel |
| 8 | wave | water surface, cloth folds |
| 9 | dot matrix | tech feel, grid dots |
| 10 | crosshatch | grid, engineering feel |
| 11 | mesh | ground reference, tech base |
| 12 | spiral | vortex, energy, vortex decor |

💡 Patterns are **procedurally generated**, not relying on external images; color is uniformly controlled by the right-panel "color", patterns only modulate light/dark or pattern (Ch19).

### 48.4 8 kinds of fonts (text tool)

| # | Font name | Style | Fits |
|---|---|---|---|
| 1 | YaHei | modern sans-serif | general, UI feel |
| 2 | SimSun | serif | traditional, formal, bookish |
| 3 | KaiTi | handwriting script | traditional, plaque, academy |
| 4 | SimHei (black) | bold sans-serif | slogan, eye-catching |
| 5 | FangSong | FangSong | official document, solemn |
| 6 | Arial | western sans-serif | English sign |
| 7 | Times | Times New Roman serif | western formal, info board |
| 8 | Courier | Courier New monospace | technical, retro, typewriter style |

⚠️ Default font size **80**, needs to be reduced by block scale (§21, §42.3). Chinese fonts depend on system fonts and may fall back on other devices.

### 48.5 7 kinds of views (bottom buttons)

| # | View | See what | Typical use |
|---|---|---|---|
| 1 | Perspective | oblique 3D from above, freely 360° rotatable (default) | see overall effect, render |
| 2 | Top | straight down from above | ground layout, logo, flat composition |
| 3 | Bottom | straight up from below | see bottom face, special composition |
| 4 | Front | straight from the front | judge on-ground/floating, elevation |
| 5 | Back | straight from the back | see back face, symmetry check |
| 6 | Left | straight from the left | check left/right intersection |
| 7 | Right | straight from the right | check left/right intersection |

💡 **Core lesson (one of the iron rules throughout the book)**: do what you do, view it from that view. Adjust height with front view, see layout with top view, see overall with perspective. After free rotate the "perspective" button goes dark, which is normal.

### 48.6 Color usage advice

This tool has no fixed "color number table"; colors are obtained via **preset palette + custom picker + screen eyedropper** (Ch18):

- Prefer the **preset palette** (grouped by hue, fixed hue bar, easiest to get harmonious colors);
- For precise colors use **custom picker** (enter color value);
- For "a color in the picture" use the **screen eyedropper** to pick it;
- Color iron rule: **keep within 2–3 colors**, rely on shades of the same hue for layers, more professional than piling on colors (§43.8).

---

# Part 13 · Sticky Notes & Multilingual

By now you know "how to use the tools". This part covers two small things that "keep you company while learning": sticky notes you take while reading, and the manual itself being multilingual.

## Ch49 Take Notes While Reading: Sticky Notes in the Manual

While studying, you'll often want to "mark" a paragraph. The manual lets you **select some text → add a sticky note** right in the body:

1. While reading the manual, drag to select any text with the mouse;
2. On release, an "Add sticky note" button pops up — click it;
3. The selected text is highlighted and recorded in the **sticky-note list** on the right or at the bottom;
4. Each entry in the list can be **deleted** individually — a confirmation dialog appears first, to avoid accidental deletion.

> 💡 A sticky note "travels with the text": it is bound to the sentence you selected, so you can later revisit "what I was thinking then".

## Ch50 Floating Sticky Windows: Pin a Note on Screen

If you don't want to keep flipping to the note list, you can **expand a sticky note into a floating window**:

- A sticky window is a draggable floating card that hovers above the canvas without blocking operation;
- It has **read-only** and **edit** states: read-only looks like a sticky pad, edit lets you change the text;
- When no longer needed, click its close button (`closeSticky`); it disappears from screen, but the note itself stays in the list.

> 📌 Sticky windows suit "temporary hints": e.g. pin a parameter explanation to the side and refer to it while you work.

## Ch51 Multilingual: the Manual Also "Speaks" Your Language

Both the interface and the manual support four languages:

| Language | Interface | Manual |
| --- | --- | --- |
| Simplified Chinese | ✅ | ✅ |
| English | ✅ | ✅ |
| Japanese | ✅ | ✅ |
| Traditional Chinese | ✅ | ✅ |

How to switch: choose a language in Settings; the interface text and the manual body switch to that language **together**. The manual's multilingual content lives in `docs/使用说明书.md` (Simplified), `使用说明书_en.md`, `使用説明書_ja.md`, `使用說明書_zh-TW.md`.

> ⚠️ About delete confirmation: every delete (sticky notes, scene objects) goes through a **custom confirm dialog**, not the browser's native one, so it still pops up reliably in **fullscreen / immersive mode** and never "does nothing when clicked".

---

✅ **The book ends here.** You've walked: 3D basics → shapes & colors → text/brush/image → views → undo history → each shape in detail → shortcuts → transform controls → multi-select & clone → four practice projects → sticky notes & multilingual → this part's troubleshooting appendix.

📌 **Last words**: tools go obsolete, but the three things "decompose — order — aesthetics" do not. Close the document, go build something of your own.

<!-- __END__ -->
