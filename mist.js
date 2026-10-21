// Drifting stage haze over the background photo.
(function () {
    var canvas = document.getElementById('mist');
    var ctx = canvas.getContext('2d');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var CLOUD_COUNT = 26;
    // The haze barely moves between frames, so ~30fps is plenty.
    var FRAME_MS = 33;
    // The haze is soft, so render at half resolution and let CSS scale it up.
    var SCALE = 0.5;

    // One soft puff, drawn once and stamped (stretched) for every cloud.
    var puff = document.createElement('canvas');
    puff.width = puff.height = 256;
    var p = puff.getContext('2d');
    var gradient = p.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, 'rgba(255, 225, 225, 1)');
    gradient.addColorStop(0.45, 'rgba(255, 225, 225, 0.45)');
    gradient.addColorStop(1, 'rgba(255, 225, 225, 0)');
    p.fillStyle = gradient;
    p.fillRect(0, 0, 256, 256);

    var w, h, clouds;

    function makeCloud() {
        var size = (0.3 + Math.random() * 0.7) * Math.max(w, h) * 0.5;
        return {
            x: Math.random() * (w + size * 2.5) - size * 2.5,
            // Weighted toward the bottom, like haze settling on a stage.
            y: h * (0.2 + Math.pow(Math.random(), 0.6) * 0.9) - size / 2,
            size: size,
            speed: (Math.random() < 0.5 ? -1 : 1) * (6 + Math.random() * 14) * SCALE,
            alpha: 0.06 + Math.random() * 0.1,
            phase: Math.random() * Math.PI * 2
        };
    }

    function resize() {
        var newW = Math.ceil(window.innerWidth * SCALE);
        h = canvas.height = Math.ceil(window.innerHeight * SCALE);
        // Mobile toolbars change only the height while scrolling; keep the
        // existing clouds then so the haze doesn't jump.
        if (newW !== w) {
            w = canvas.width = newW;
            clouds = [];
            for (var i = 0; i < CLOUD_COUNT; i++) clouds.push(makeCloud());
        }
    }

    function draw(time, dt) {
        ctx.clearRect(0, 0, w, h);
        clouds.forEach(function (c) {
            c.x += c.speed * dt;
            if (c.x > w) c.x = -c.size * 2.5;
            if (c.x < -c.size * 2.5) c.x = w;
            // Each cloud slowly thickens and thins.
            ctx.globalAlpha = c.alpha * (0.6 + 0.4 * Math.sin(time / 4000 + c.phase));
            var y = c.y + Math.sin(time / 6000 + c.phase) * c.size * 0.08;
            ctx.drawImage(puff, c.x, y, c.size * 2.5, c.size);
        });
    }

    resize();
    draw(0, 0);
    window.addEventListener('resize', function () {
        resize();
        // Resizing clears the canvas; redraw now in case the loop is idle.
        draw(last || 0, 0);
    });

    var last;
    requestAnimationFrame(function frame(now) {
        requestAnimationFrame(frame);
        if (reduceMotion.matches) {
            last = undefined;
            return;
        }
        if (last === undefined) last = now;
        if (now - last < FRAME_MS) return;
        // Cap the step so a backgrounded tab doesn't jump the clouds on return.
        var dt = Math.min((now - last) / 1000, 0.1);
        last = now;
        draw(now, dt);
    });
})();
