<?php

namespace Drupal\group_menu\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\group\Entity\Group;

/**
 * Provides a Group Menu block.
 *
 * @Block(
 *   id = "group_menu_block",
 *   admin_label = @Translation("Group Menu"),
 *   category = @Translation("Group")
 * )
 */
class GroupMenuBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $group = \Drupal::routeMatch()->getParameter('group');

    if (!$group instanceof Group) {
      return [];
    }

    $storage = \Drupal::entityTypeManager()->getStorage('group_content');
    $items = $storage->loadByProperties([
      'type' => 'group_menu_link',
      'gid' => $group->id(),
    ]);

    $menu = [];

    foreach ($items as $item) {
      $entity = $item->getEntity();

      // Your link field.
      $link_field = $entity->get('field_gmenu_link')->first();
      if (!$link_field) {
        continue;
      }

      $menu[] = [
        'title' => $link_field->title,
        'url' => $link_field->getUrl(),
        'weight' => $entity->get('field_weight')->value ?? 0,
      ];
    }

    usort($menu, fn($a, $b) => $a['weight'] <=> $b['weight']);

    return [
      '#theme' => 'group_menu',
      '#items' => $menu,
      '#cache' => [
        'contexts' => ['route.group'],
        'tags' => ['group:' . $group->id()],
      ],
    ];
  }

}
