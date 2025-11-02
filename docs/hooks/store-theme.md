---
title: $theme
subtitle: theme in lapikit
head:
  title: theme stored
  description: "Learn how to use the theme store in Lapikit for responsive design."
state:
  section: hooks
  category: stores
  published: true
github:
  url: /hooks/store-theme.md
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // actions
    import ThemeStoredBase from "$lib/components/docs/stores/store-theme.svelte?raw";
</script>

Lapikit propose un store theme qui contient le thème actuellement appliqué à l'application.
Il est mis à jour automatiquement lorsque vous utilisez l'action [useTheme](/docs/actions/use-theme), mais vous pouvez également le modifier directement en lui attribuant une nouvelle valeur via le fichier de configuration `plugins/lapikit.(js|ts)`.

Pour en savoir plus sur la personnalisation des thèmes, consultez la documentation sur les [customize](/docs/customize).

<Sandbox name="use-stored-theme" code={ThemeStoredBase}/>
