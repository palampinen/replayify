// Set <meta name="theme-color" /> which changes color of
// URL bar in mobile Chrome
function changeThemeColor(color) {
  const themeMetaTag = document.querySelector('meta[name="theme-color"]');
  if (themeMetaTag) {
    themeMetaTag.content = color;
  }
}

export default changeThemeColor;
