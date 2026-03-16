(function() {
    var patternEl = document.getElementById('regexPattern');
    var textEl = document.getElementById('regexText');
    var testBtn = document.getElementById('regexTest');
    var clearBtn = document.getElementById('regexClear');
    var statusEl = document.getElementById('regexStatus');
    var highlightWrap = document.getElementById('regexHighlightWrap');
    var highlightedEl = document.getElementById('regexHighlighted');
    var matchesWrap = document.getElementById('regexMatchesWrap');
    var matchListEl = document.getElementById('regexMatchList');
    var flagG = document.getElementById('regexFlagG');
    var flagI = document.getElementById('regexFlagI');
    var flagM = document.getElementById('regexFlagM');
    var flagS = document.getElementById('regexFlagS');

    function setStatus(msg, type) {
        if (!statusEl) return;
        statusEl.textContent = msg;
        statusEl.className = 'code-status ' + (type || '');
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function getFlags() {
        var f = '';
        if (flagG && flagG.checked) f += 'g';
        if (flagI && flagI.checked) f += 'i';
        if (flagM && flagM.checked) f += 'm';
        if (flagS && flagS.checked) f += 's';
        return f;
    }

    function runTest() {
        if (!patternEl || !textEl) return;
        var pattern = patternEl.value;
        var text = textEl.value;

        if (!pattern) {
            setStatus('Enter a regex pattern.', 'error');
            highlightWrap.style.display = 'none';
            matchesWrap.style.display = 'none';
            return;
        }
        if (!text) {
            setStatus('Enter test text.', 'error');
            highlightWrap.style.display = 'none';
            matchesWrap.style.display = 'none';
            return;
        }

        var flags = getFlags();
        var re;
        try {
            re = new RegExp(pattern, flags);
        } catch (e) {
            setStatus('Invalid regex: ' + e.message, 'error');
            highlightWrap.style.display = 'none';
            matchesWrap.style.display = 'none';
            return;
        }

        var matches = [];
        if (flags.indexOf('g') !== -1) {
            var m;
            re.lastIndex = 0;
            while ((m = re.exec(text)) !== null) {
                matches.push({ match: m, index: m.index });
                if (m[0].length === 0) re.lastIndex++;
            }
        } else {
            var single = re.exec(text);
            if (single) matches.push({ match: single, index: single.index });
        }

        if (matches.length === 0) {
            setStatus('No matches found.', 'info');
            highlightWrap.style.display = 'none';
            matchesWrap.style.display = 'none';
            return;
        }

        setStatus(matches.length + ' match' + (matches.length !== 1 ? 'es' : '') + ' found.', 'success');

        var highlighted = '';
        var last = 0;
        for (var i = 0; i < matches.length; i++) {
            var mi = matches[i];
            var start = mi.index;
            var end = start + mi.match[0].length;
            highlighted += escapeHtml(text.slice(last, start));
            highlighted += '<mark>' + escapeHtml(text.slice(start, end)) + '</mark>';
            last = end;
        }
        highlighted += escapeHtml(text.slice(last));
        highlightedEl.innerHTML = highlighted;
        highlightWrap.style.display = 'block';

        matchListEl.innerHTML = '';
        for (var j = 0; j < matches.length; j++) {
            var mj = matches[j];
            var item = document.createElement('div');
            item.className = 'regex-match-item';
            var end2 = mj.index + mj.match[0].length;
            var groupsStr = '';
            if (mj.match.length > 1) {
                var parts = [];
                for (var k = 1; k < mj.match.length; k++) {
                    parts.push('Group ' + k + ': ' + (mj.match[k] !== undefined ? escapeHtml(mj.match[k]) : 'undefined'));
                }
                groupsStr = '<div class="regex-match-groups">' + parts.join(' | ') + '</div>';
            }
            item.innerHTML = '<span class="regex-match-index">#' + (j + 1) + '</span>' +
                '<span class="regex-match-value">' + escapeHtml(mj.match[0]) + '</span>' +
                '<span class="regex-match-pos">pos ' + mj.index + '-' + end2 + '</span>' +
                groupsStr;
            matchListEl.appendChild(item);
        }
        matchesWrap.style.display = 'block';
    }

    if (testBtn) {
        testBtn.addEventListener('click', runTest);
    }

    if (patternEl) {
        patternEl.addEventListener('input', runTest);
    }

    if (textEl) {
        textEl.addEventListener('input', runTest);
    }

    var flagEls = [flagG, flagI, flagM, flagS];
    for (var f = 0; f < flagEls.length; f++) {
        if (flagEls[f]) {
            flagEls[f].addEventListener('change', runTest);
        }
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (patternEl) patternEl.value = '';
            if (textEl) textEl.value = '';
            if (highlightedEl) highlightedEl.innerHTML = '';
            if (matchListEl) matchListEl.innerHTML = '';
            if (highlightWrap) highlightWrap.style.display = 'none';
            if (matchesWrap) matchesWrap.style.display = 'none';
            setStatus('', '');
        });
    }
})();
