# Markdown Support in Coffee Sip

Coffee Sip uses the [marked](https://marked.js.org/) library to render bot responses with full markdown formatting.

## Library Choice: Marked

**Why marked?**
- ✅ **Lightweight** - Only ~20KB gzipped (total bundle: 68KB ES, 56KB UMD)
- ✅ **Fast** - Optimized parser, handles large messages efficiently
- ✅ **Standards-compliant** - Supports CommonMark and GitHub Flavored Markdown
- ✅ **Well-maintained** - Active development, 30K+ stars on GitHub
- ✅ **Extensible** - Can add custom renderers if needed
- ✅ **No dependencies** - Pure JavaScript implementation

## Alternatives Considered

1. **markdown-it** - More features but heavier (~40KB)
2. **showdown** - Older, less maintained
3. **remark** - Very modular but complex setup
4. **micromark** - Smaller but requires more configuration

## Configuration

Located in `src/lib/chatbot.ts`:

```typescript
marked.setOptions({
  breaks: true,  // Convert \n to <br>
  gfm: true,     // GitHub Flavored Markdown
});
```

## Supported Features

### Text Formatting
- **Bold**: `**text**` or `__text__`
- *Italic*: `*text*` or `_text_`
- ~~Strikethrough~~: `~~text~~`

### Code
- Inline: \`code\`
- Blocks:
  \`\`\`language
  code here
  \`\`\`

### Structure
- Headers: `#`, `##`, `###`, `####`
- Lists: `-` or `*` for unordered, `1.` for ordered
- Blockquotes: `>`
- Links: `[text](url)`
- Tables: GFM syntax

## Security

- **User messages**: HTML-escaped (no markdown) - prevents XSS
- **Bot messages**: Rendered with marked (trusted source)
- **Sanitization**: Marked escapes HTML by default
- **Links**: Open in current tab (can be configured)

## Styling

All markdown elements are styled in `src/styles/chatbot.css.ts`:

- Code blocks: Light gray background
- Dark theme: Adjusted backgrounds for readability
- Responsive: Works on mobile
- Consistent: Matches chatbot theme

### Custom Styles

Markdown styles are scoped to bot messages:

```css
.coffee-sip-message.bot .coffee-sip-message-bubble p { }
.coffee-sip-message.bot .coffee-sip-message-bubble code { }
.coffee-sip-message.bot .coffee-sip-message-bubble pre { }
/* etc. */
```

## Testing

Test page available at `demo/markdown-test.html`:

```bash
npm run dev
# Visit http://localhost:5173/demo/markdown-test.html
```

Test buttons for:
- Basic markdown (bold, italic, links)
- Code blocks (inline and fenced)
- Lists (ordered and unordered)
- Advanced (headers, blockquotes, tables)

## Performance

- **Parse time**: ~1ms for typical message
- **Bundle impact**: +54KB ES (+54KB UMD)
- **Runtime**: No noticeable lag
- **Memory**: Minimal overhead

## Future Enhancements

Possible additions:
- [ ] Syntax highlighting for code blocks (highlight.js/prism)
- [ ] Custom emoji support
- [ ] LaTeX/Math rendering (KaTeX)
- [ ] Sanitization options for user-configurable bots
- [ ] Custom link behavior (open in new tab)

## Example Usage

Backend response:
```json
{
  "answer": "Here's a **formatted** response:\n\n```js\nconsole.log('Hello!');\n```\n\n- Item 1\n- Item 2"
}
```

Rendered output:
> Here's a **formatted** response:
>
> ```js
> console.log('Hello!');
> ```
>
> - Item 1
> - Item 2

## Notes

- Only bot messages are rendered as markdown
- User messages remain plain text for security
- Markdown is rendered on message receive, not on display
- No server-side processing required
- Works offline after initial load
