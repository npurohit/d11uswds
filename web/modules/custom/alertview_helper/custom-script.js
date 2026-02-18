/* Custom JS file for CMSGOV EPS USWDS subtheme */ 
/* New code based on block_1 */
/* Custom JS file for CMSGOV EPS USWDS subtheme */ 
(function ($, Drupal, once) {
  'use strict';

  Drupal.behaviors.viewBlockNavigation = {
    attach: function (context, settings) {
      // 1. Use your custom class
      const elements = once('view-block-nav', '.js-alert-notification', context);
      
      elements.forEach(function (el) {
        var $viewBlock = $(el);
        // 2. Fallback: if .view-content doesn't exist, use the block itself
        var $viewContent = $viewBlock.find('.view-content').length ? 
                           $viewBlock.find('.view-content') : 
                           $viewBlock;
        
        var originalContent = null;

        // Use delegated events on the $viewBlock
        $viewBlock.on('click', '.views-field-title a, .usa-link', function (e) {
          e.preventDefault();
          var nodeUrl = $(this).attr('href');
          
          if (!originalContent) {
            originalContent = $viewContent.html();
          }

          // Show USWDS loading state
          $viewContent.html(
            '<div class="usa-alert usa-alert--info usa-alert--slim" role="status">' +
              '<div class="usa-alert__body"><p class="usa-alert__text">Loading content...</p></div>' +
            '</div>'
          );

          $.ajax({
            url: nodeUrl,
            method: 'GET',
            success: function (response) {
              var $response = $(response);
              // Target common USWDS/Drupal content wrappers
              var $nodeContent = $response.find('main, .node--full, article, .usa-prose').first();
              
              if ($nodeContent.length) {
                var backButton = 
                  '<div class="margin-bottom-3">' +
                    '<button class="usa-button usa-button--outline back-to-view" type="button">Back to list</button>' +
                  '</div>';
                
                $viewContent.html('<div class="usa-prose">' + backButton + '<div class="node-wrapper"></div></div>');
                $viewContent.find('.node-wrapper').html($nodeContent.html());
                
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Re-attach behaviors
                Drupal.attachBehaviors($viewContent[0], settings);
              }
            }
          });
        });

        // Back button handler
        $viewBlock.on('click', '.back-to-view', function (e) {
          e.preventDefault();
          if (originalContent) {
            $viewContent.html(originalContent);
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            Drupal.attachBehaviors($viewContent[0], settings);
          }
        });
      });
    }
  };
})(jQuery, Drupal, once);
/* End of new code based on block_1 */
