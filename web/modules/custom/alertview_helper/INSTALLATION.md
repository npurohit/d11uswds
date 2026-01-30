# INSTALLATION GUIDE
# Alert View Helper Module for Drupal 11 + USWDS 3.0

## Quick Start Checklist

- [ ] Upload module to /modules/custom/alertview_helper
- [ ] Enable module: drush en alertview_helper -y
- [ ] Copy JS file to theme
- [ ] Copy CSS file to theme  
- [ ] Add library definition to theme
- [ ] Update module configuration
- [ ] Configure view displays
- [ ] Clear cache
- [ ] Test functionality

---

## STEP 1: Install the Module

1. Upload the `alertview_helper` folder to:
   ```
   /modules/custom/alertview_helper
   ```
   
2. Enable the module:
   ```bash
   drush en alertview_helper -y
   ```
   
   OR via UI: Administration > Extend > Check "Alert View Helper" > Install

---

## STEP 2: Add Files to Your Theme

### File 1: JavaScript

**Source:** theme-files/js/view-block-navigation.js
**Destination:** themes/custom/YOUR_THEME/js/view-block-navigation.js

1. Create the js folder if it doesn't exist
2. Copy view-block-navigation.js to this location
3. **IMPORTANT:** Edit the file and update:
   - Line 21: Replace `YOUR_VIEW_ID` with your view machine name
   - Lines 44, 66, 138: Update sprite.svg paths to match your setup

**To find your sprite.svg path:**
```bash
find . -name "sprite.svg" -path "*/uswds/*"
```

Common paths:
- /libraries/uswds/dist/img/sprite.svg
- /themes/contrib/uswds_base/uswds/dist/img/sprite.svg
- /themes/custom/YOUR_THEME/uswds/dist/img/sprite.svg

### File 2: CSS

**Source:** theme-files/css/view-block-navigation.css
**Destination:** themes/custom/YOUR_THEME/css/view-block-navigation.css

1. Create the css folder if it doesn't exist
2. Copy view-block-navigation.css to this location
3. No edits needed (works out of the box)

### File 3: Library Definition

**Source:** theme-files/LIBRARY-DEFINITION.txt
**Destination:** Add to themes/custom/YOUR_THEME/YOUR_THEME.libraries.yml

1. Open YOUR_THEME.libraries.yml (create if doesn't exist)
2. Add the library definition from LIBRARY-DEFINITION.txt
3. Verify the paths match your file structure

---

## STEP 3: Configure the Module

Edit: /modules/custom/alertview_helper/alertview_helper.module

**Line 19:** Replace `YOUR_VIEW_ID` with your view machine name
```php
if ($view->id() == 'news_articles' && $view->current_display == 'block_1') {
```

**Line 22:** Replace `YOUR_THEME` with your theme machine name  
```php
$variables['#attached']['library'][] = 'mytheme/view-block-navigation';
```

**To find your view machine name:**
- Go to Structure > Views
- Click "Edit" on your view
- Look at URL: /admin/structure/views/view/[MACHINE_NAME]

**To find your theme machine name:**
- Go to Appearance
- Your active theme's folder name is the machine name

---

## STEP 4: Configure Your View

### A. Configure List Display

1. Go to Structure > Views > [Your View] > Edit
2. Ensure you have a Block display
3. Note the display ID (usually "block_1")
4. Configure as desired for your list view

### B. Create Detail Display

1. Click "+ Add" next to Displays
2. Select "Block"
3. Give it a name like "Detail Display"

**Format Settings:**
- Format: Show as "Content" (Rendered entity)
- View mode: "Full content"
- Items to display: 1
- Use pager: No

**Add Contextual Filter:**
1. Under "Advanced" section, click "Add" next to "Contextual filters"
2. Select "Content: Nid"
3. Configure:
   - When filter value is NOT available: "Hide view"
   - When filter value IS available: Validator "Numeric"
4. Click "Apply"

**Filter Criteria (recommended):**
- Content: Published (= Yes)
- Content: Type (= Your content type)

5. Save the view

---

## STEP 5: Clear Cache

```bash
drush cr
```

OR via UI: Configuration > Performance > Clear all caches

---

## STEP 6: Test

1. Go to the page where your view block is placed
2. Click on a node title link
3. Verify:
   - [ ] Full node content loads in the same block
   - [ ] Back button appears
   - [ ] Clicking back returns to list
   - [ ] Smooth transitions work
   - [ ] No JavaScript errors in console

---

## Troubleshooting

### Icons Not Showing
**Problem:** SVG icons for buttons not appearing
**Solution:** 
- Check browser console for 404 errors
- Verify sprite.svg path in view-block-navigation.js
- Run: `find . -name "sprite.svg" -path "*/uswds/*"`
- Update all three sprite.svg references in the JS file

### JavaScript Not Working
**Problem:** Nothing happens when clicking links
**Solution:**
- Clear cache: `drush cr`
- Check browser console for errors
- Verify view machine name in JS matches your view
- Ensure jQuery is loading
- Check that library is defined in YOUR_THEME.libraries.yml

### View Not Switching
**Problem:** Click doesn't load node content
**Solution:**
- Verify view machine name in alertview_helper.module
- Check both view displays exist
- Ensure detail display has contextual filter
- Check JavaScript console for AJAX errors
- Verify node selector in JS matches your theme's markup

### Back Button Not Working
**Problem:** Can't return to list view
**Solution:**
- Clear cache
- Check for JavaScript errors
- Verify Drupal.behaviors is attaching
- Test with browser console open

### Styling Issues
**Problem:** Elements don't look right
**Solution:**
- Verify CSS file is loading (check Network tab)
- Ensure library dependencies are correct
- Check for CSS conflicts with other styles
- Verify USWDS classes are available

---

## File Structure Reference

After installation, your structure should look like:

```
drupal/
├── modules/
│   └── custom/
│       └── alertview_helper/
│           ├── alertview_helper.info.yml
│           ├── alertview_helper.module
│           └── README.md
│
└── themes/
    └── custom/
        └── YOUR_THEME/
            ├── YOUR_THEME.libraries.yml (modified)
            ├── js/
            │   └── view-block-navigation.js (new)
            └── css/
                └── view-block-navigation.css (new)
```

---

## Getting Help

If you encounter issues:

1. **Check browser console** for JavaScript errors
2. **Verify file paths** are correct
3. **Clear cache** after any changes
4. **Review README.md** for additional documentation
5. **Check view configuration** is correct

---

## Next Steps

After successful installation:

1. Customize the styling in view-block-navigation.css to match your design
2. Adjust transitions and animations as desired
3. Add custom functionality if needed
4. Test with screen readers for accessibility
5. Test on mobile devices

Enjoy your enhanced view navigation!
