/* FriCAS Sphinx Documentation - Example Box & Copy Button */

document.addEventListener('DOMContentLoaded', () => {
    // Clipboard helper with fallback for local file:// or non-secure contexts
    async function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            return new Promise((resolve, reject) => {
                const successful = document.execCommand('copy');
                textArea.remove();
                if (successful) {
                    resolve();
                } else {
                    reject(new Error('execCommand copy failed'));
                }
            });
        }
    }

    const clipboardIconSvg = `
        <svg class="fricas-copy-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
    `;

    const checkmarkIconSvg = `
        <svg class="fricas-copy-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    `;

    const examples = document.querySelectorAll('.fricas-example');
    examples.forEach((example) => {
        if (example.querySelector('.fricas-example-header')) return;

        const pre = example.querySelector('pre');
        if (!pre) return;

        // Create header bar
        const header = document.createElement('div');
        header.className = 'fricas-example-header';

        // FriCAS label
        const title = document.createElement('span');
        title.className = 'fricas-example-title';
        title.textContent = 'FriCAS';

        // Copy button
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'fricas-copy-btn';
        btn.setAttribute('aria-label', 'Copy code to clipboard');
        btn.innerHTML = `${clipboardIconSvg}<span class="fricas-copy-text">Copy</span>`;

        let resetTimer = null;
        btn.addEventListener('click', async () => {
            const textToCopy = (pre.innerText || pre.textContent).replace(/^\s+|\s+$/g, '');
            try {
                await copyToClipboard(textToCopy);
                btn.classList.add('copied');
                btn.innerHTML = `${checkmarkIconSvg}<span class="fricas-copy-text">Copied</span>`;

                if (resetTimer) clearTimeout(resetTimer);
                resetTimer = setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = `${clipboardIconSvg}<span class="fricas-copy-text">Copy</span>`;
                }, 2000);
            } catch (err) {
                console.error('FriCAS documentation: failed to copy text', err);
            }
        });

        header.appendChild(title);
        header.appendChild(btn);

        // Prepend header to example container
        example.insertBefore(header, example.firstChild);
    });
});
