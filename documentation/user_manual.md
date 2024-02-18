# USER MANUAL

## General

N/A

## Application Layout

Biggest part of the screen layout is the actual field plan. It's a grid layout representing all the possible locations for the boreholes. The view can be zoomed with the controls provided in the "View" menu.

## Application Menu

### File Menu

**New Plan**: (opens in a new tab) Create a new plan.

**Load Plan From Save Code [unavailable]**: (opens in a new tab) Load an old plan with an existing save code.

**Configure Latency Selection**: Open the view to configure the latency selection for the active plan.

**Analyze [unavailable]**: Analyze the field and create statistics.

**Get Save Code [unavailable]**: Generates a new save code for the current field at the moment.

**Print [unavailable]**: Print the field plan.

**Reset Field**: Completely reset the field.

**Exit**: Exit the application without saving.

### Select

**Tool**: Select a tool.

**Bulk Replace Tool**: Activate the Bulk Replace Tool. Functionality: All connections on the field with the latency _x_ are replaced with the latency _y_.

**Toggle Borehole Linking**: Toggle the Borehole Linking on and off. When _on_, connections may be done in a chain-like fashion, where the latest borehole is remembered and a new connection creation is instantly started. When _off_, each connection must be created by always first clicking the starting node and then the finishing node.

**Clear Tool Selection**: Reset the Tool selection to "cursor".

**Clear Borehole Selection**: Reset the Borehole selection to "null".

### View

**Zoom In**: Increase the Zoom level by 1.

**Zoom Out**: Decrease the Zoom level by 1.,

**Zoom Minimum**: Zoom as far out as possible.

**Zoom Maximum**: Zoom as close in as possible.

**Reset Zoom**: Reset the Zoom level to default.

**Toggle Fullscreen**: Enable and disable the Fullscreen mode, also achieved with key F11.

### Debug

**Log state arrays to console**: Log the _field_, _fieldStatus_, and _fieldValues_ matrices into the web console. Open console with F12.
