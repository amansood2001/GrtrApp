// Runtime setup script injected into preview HTML for Turbopack chunk asset routing
export const interactivePreviewSnippet = (chatId: string) => `
<script>
(function() {
  const prefix = '/api/preview/' + '${chatId}';
  window.TURBOPACK_CHUNK_BASE_PATH = prefix + '/_next/';
  window.TURBOPACK_NEXT_CHUNK_URLS = [];
})();
</script>
`;
