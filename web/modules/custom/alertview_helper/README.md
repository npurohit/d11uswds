# Alert View Helper Module

Enables in-block navigation for Drupal 11 Views with back button functionality. Designed to work with USWDS 3.0 base theme.

## Features

- Opens node content within the same view block
- Provides a back button to return to the list view
- Full USWDS 3.0 styling and accessibility support
- Smooth transitions and loading states
- Screen reader announcements for accessibility

## Installation

1. **Upload the module:**
   - Copy the `alertview_helper` folder to your `/modules/custom/` directory
   - If the `custom` folder doesn't exist, create it

2. **Enable the module:**
   ```bash
   drush en alertview_helper -y
   drush cr
   ```
   
   Or via UI: Administration > Extend > Check "Alert View Helper" > Install

## Setup

### Step 1: Configure the Module

Edit `/modules/custom/alertview_helper/alertview_helper.module` and update:

```php
// Line 19: Replace with your view machine name
if ($view->id() == 'YOUR_VIEW_ID' && $view->current_display == 'block_1') {

// Line 22: Replace with your theme machine name  
$variables['#attached']['library'][] = 'YOUR_THEME/view-block-navigation';
```

**To find your view machine name:**
- Go to Structure > Views
- Find your view and click "Edit"
- Look at the URL: `/admin/structure/views/view/[MACHINE_NAME]`

**To find your theme machine name:**
- Go to Appearance
- Your active theme's folder name is the machine name

### Step 2: Add Files to Your Theme

You need to add 3 files to your USWDS theme:

#### File 1: JavaScript
Create: `themes/custom/YOUR_THEME/js/view-block-navigation.js`

Copy the JavaScript code from the provided `view-block-navigation.js` file.

**Important:** Update the sprite.svg path on lines 24, 45, and 72 to match your setup:
- Check where your USWDS sprite.svg is located
- Common paths:
  - `/libraries/uswds/dist/img/sprite.svg`
  - `/themes/contrib/uswds_base/uswds/dist/img/sprite.svg`
  - `/themes/custom/YOUR_THEME/uswds/dist/img/sprite.svg`

#### File 2: CSS  
Create: `themes/custom/YOUR_THEME/css/view-block-navigation.css`

Copy the CSS code from the provided `view-block-navigation.css` file.

#### File 3: Library Definition
Add to: `themes/custom/YOUR_THEME/YOUR_THEME.libraries.yml`

```yaml
view-block-navigation:
  version: 1.x
  js:
    js/view-block-navigation.js: {}
  css:
    theme:
      css/view-block-navigation.css: {}
  dependencies:
    - core/drupal
    - core/jquery
    - core/drupal.ajax
    - uswds_base/uswds-init
```

### Step 3: Configure Your View

#### Create List Display (if not already created)
1. Go to Structure > Views > Your View
2. Ensure you have a Block display for the list view
3. Note the display ID (usually `block_1`)

#### Create Detail Display
1. Click "+ Add" next to Displays
2. Select "Block"
3. Configure:
   - **Format:** Show as "Content" (Rendered entity)
   - **View mode:** Full content
   - **Items to display:** 1
   - **Use pager:** No

4. Add Contextual Filter:
   - Click "Add" next to Contextual filters
   - Select "Content: Nid"
   - Configure:
     - When filter value is NOT available: "Hide view"
     - When filter value IS available: Validator "Numeric"
   - Save

5. Save the view

### Step 4: Clear Cache

```bash
drush cr
```

Or via UI: Configuration > Performance > Clear all caches

## Usage

Once configured, when users click on a node title link in your view:
- The full node content will load in the same block
- A "Back to list" button appears at the top
- Clicking back returns to the list view
- All with smooth transitions and accessibility support

## Troubleshooting

**JavaScript not loading:**
- Clear Drupal cache: `drush cr`
- Check browser console for errors
- Verify library is defined in YOUR_THEME.libraries.yml
- Verify file paths are correct

**Icons not showing:**
- Check the sprite.svg path in the JavaScript
- Verify USWDS is properly installed
- Check browser console for 404 errors

**View not switching:**
- Verify view machine name matches in alertview_helper.module
- Check that both displays exist
- Ensure detail display has contextual filter configured
- Check JavaScript console for errors

**Back button not working:**
- Clear cache
- Check that jQuery is loaded
- Verify Drupal behaviors are attaching

## Finding Your Sprite Path

Run this in your Drupal root to find sprite.svg:

```bash
find . -name "sprite.svg" -path "*/uswds/*"
```

Then update the paths in view-block-navigation.js accordingly.

## Support

For issues:
1. Check browser console for JavaScript errors
2. Verify all file paths are correct
3. Ensure view displays are properly configured
4. Clear cache after any changes

## Credits

Created for Drupal 11 with USWDS 3.0 base theme.
