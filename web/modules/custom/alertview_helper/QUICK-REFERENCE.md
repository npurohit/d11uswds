# QUICK CONFIGURATION REFERENCE

## Files to Edit After Installation

### 1. alertview_helper.module
**Location:** /modules/custom/alertview_helper/alertview_helper.module

**Line 19 - Set your view ID:**
```php
if ($view->id() == 'YOUR_VIEW_ID' && $view->current_display == 'block_1') {
```
Change: YOUR_VIEW_ID → your_actual_view_machine_name

**Line 22 - Set your theme:**
```php
$variables['#attached']['library'][] = 'YOUR_THEME/view-block-navigation';
```
Change: YOUR_THEME → your_actual_theme_machine_name

---

### 2. view-block-navigation.js
**Location:** /themes/custom/YOUR_THEME/js/view-block-navigation.js

**Line 21 - Set your view ID:**
```javascript
var $viewBlock = $('.view-id-YOUR_VIEW_ID', context).once('view-block-nav');
```
Change: YOUR_VIEW_ID → your_actual_view_machine_name

**Lines 44, 66, 138 - Set sprite path:**
```javascript
'<use xlink:href="/libraries/uswds/dist/img/sprite.svg#autorenew"></use>'
```
Change path to match your USWDS installation

---

### 3. YOUR_THEME.libraries.yml
**Location:** /themes/custom/YOUR_THEME/YOUR_THEME.libraries.yml

**Add this library definition:**
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

---

## How to Find Required Values

### View Machine Name
1. Go to: Structure > Views
2. Click "Edit" on your view
3. Check URL: `/admin/structure/views/view/[THIS_IS_IT]`

### Theme Machine Name
1. Go to: Appearance
2. Find your active theme
3. The folder name in `/themes/custom/` is the machine name

### Sprite.svg Path
Run in terminal:
```bash
find . -name "sprite.svg" -path "*/uswds/*"
```

Common paths:
- `/libraries/uswds/dist/img/sprite.svg`
- `/themes/contrib/uswds_base/uswds/dist/img/sprite.svg`

---

## View Configuration Checklist

### List Display (block_1)
- [x] Display type: Block
- [x] Format: As desired (grid, table, etc.)
- [x] Show: Fields or Content
- [x] Title field has link to node

### Detail Display (block_detail)
- [x] Display type: Block
- [x] Format: Show as "Content"
- [x] View mode: "Full content"
- [x] Items to display: 1
- [x] Use pager: No
- [x] Contextual filter: Content: Nid
  - When NOT available: Hide view
  - When available: Validator "Numeric"

---

## Common Values Examples

### View Machine Name Examples:
- news_articles
- blog_posts
- alerts
- events
- content_listing

### Theme Machine Name Examples:
- mytheme
- uswds_subtheme
- agency_theme
- custom_uswds

### View ID CSS Class:
If your view machine name is `news_articles`, the CSS class will be:
`.view-id-news_articles`

---

## Testing Checklist

After configuration:
1. Clear cache: `drush cr`
2. Visit page with view block
3. Click a title link
4. Verify full node loads
5. Check back button appears
6. Click back button
7. Verify list returns
8. Check browser console for errors
9. Test keyboard navigation (Tab, Enter)
10. Test with screen reader if possible

---

## Need Help?

See INSTALLATION.md for detailed step-by-step instructions.
See README.md for troubleshooting and support information.
