/**
 * SASI 2026 — animação em Canvas da logo arcade.
 * Geometria adaptada do estúdio HTML fornecido pela organização.
 * Uma única barra é desenhada dentro da mesma moldura (x=32..688, y=248..302).
 * Nenhuma imagem é sobreposta; canvas de fallback permanece no HTML.
 */
const canvas = document.getElementById("hero-logo-canvas");
if (canvas) {
const context = canvas.getContext("2d", { alpha: true });
if (context) {
const BASE_WIDTH = 920;
const BASE_HEIGHT = 330;
const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
canvas.width = Math.round(BASE_WIDTH * dpr);
canvas.height = Math.round(BASE_HEIGHT * dpr);
context.setTransform(dpr, 0, 0, dpr, 0, 0);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const state = {
  floatIdle: true,
  glitch: false,
  loadingBar: true,
  barMode: "full-loop",
  levelUpGlow: true,
  ledMatrix: true,
  glowLevel: 1,
  particles: true,
  lastFilledBlocks: 0
};
const arcadeParticles = [];
const pixelGlyphCache = new Map();
// A animação pública não reproduz efeitos sonoros nem depende dos controles do estúdio.
const play8BitSound = () => {};
function spawnParticle() {
  if (arcadeParticles.length >= 35) return;
  arcadeParticles.push({
    x: 30 + Math.random() * 835,
    y: 55 + Math.random() * 220,
    vx: (Math.random() - .5) * 1.6,
    vy: -.65 - Math.random() * 1.3,
    size: 3 + Math.random() * 3,
    alpha: 1,
    isText: false,
    color: Math.random() > .3 ? "#00ff33" : "#7dff8e"
  });
}

const PIXEL_GLYPHS = {
            '3': [
                "111111",
                "000011",
                "000011",
                "011111",
                "000011",
                "000011",
                "111111"
            ],
            'ª': [
                "01110",
                "00010",
                "01110",
                "10010",
                "01110",
                "00000",
                "11110"
            ],
            'E': [
                "111111",
                "110000",
                "110000",
                "111110",
                "110000",
                "110000",
                "111111"
            ],
            'D': [
                "111110",
                "110011",
                "110011",
                "110011",
                "110011",
                "110011",
                "111110"
            ],
            'I': [
                "111",
                "111",
                "111",
                "111",
                "111",
                "111",
                "111"
            ],
            'Ç': [
                "011111",
                "110000",
                "110000",
                "110000",
                "110000",
                "110000",
                "011111",
                "001100",
                "011000"
            ],
            'Ã': [
                "011010",
                "101100",
                "000000",
                "011110",
                "110011",
                "110011",
                "111111",
                "110011",
                "110011",
                "110011"
            ],
            'O': [
                "011110",
                "110011",
                "110011",
                "110011",
                "110011",
                "110011",
                "011110"
            ],
            '2': [
                "111111",
                "000011",
                "000011",
                "111111",
                "110000",
                "110000",
                "111111"
            ],
            '0': [
                "111111",
                "110011",
                "110011",
                "110011",
                "110011",
                "110011",
                "111111"
            ],
            '6': [
                "111111",
                "110000",
                "110000",
                "111111",
                "110011",
                "110011",
                "111111"
            ]
        };

        /**
         * Desenha um texto em Pixel Art Vazado (Hollow Pixel Outline) idêntico ao
         * "3ª EDIÇÃO" e "2026" da logo oficial.
         */
        function drawHollowPixelText(ctx, glyphsList, cellSize, borderThickness, color, fillInteriorAlpha = 0) {
            const cacheKey = JSON.stringify(glyphsList) + "|" + cellSize + "|" + borderThickness + "|" + color + "|" + fillInteriorAlpha;
            if (pixelGlyphCache.has(cacheKey)) return pixelGlyphCache.get(cacheKey);
            const off = document.createElement('canvas');
            off.width = 450;
            off.height = 140;
            const octx = off.getContext('2d');

            let cursorX = 12;
            const baseY = 30;

            // Passo 1: desenhar a borda externa expandida (ortogonal estilo 8-bit)
            octx.fillStyle = color;
            glyphsList.forEach(item => {
                if (item.char === ' ') {
                    cursorX += item.space;
                    return;
                }
                const matrix = PIXEL_GLYPHS[item.char];
                const yOffset = item.yOffset || 0;
                const s = item.scale ? cellSize * item.scale : cellSize;
                const t = borderThickness;

                for (let r = 0; r < matrix.length; r++) {
                    for (let c = 0; c < matrix[r].length; c++) {
                        if (matrix[r][c] === '1') {
                            const px = Math.round(cursorX + c * s);
                            const py = Math.round(baseY + yOffset + r * s);
                            const w = Math.ceil(s);
                            const h = Math.ceil(s);
                            // Expansão ortogonal cria os cantos pixelados idênticos à imagem original
                            octx.fillRect(px - t, py, w + t * 2, h);
                            octx.fillRect(px, py - t, w, h + t * 2);
                        }
                    }
                }
                cursorX += matrix[0].length * s + (item.gap ?? s * 1.4);
            });

            // Passo 2: vazar o interior dos blocos para ficar transparente (ou semi-iluminado no Level Up)
            cursorX = 12;
            octx.globalCompositeOperation = 'destination-out';
            glyphsList.forEach(item => {
                if (item.char === ' ') {
                    cursorX += item.space;
                    return;
                }
                const matrix = PIXEL_GLYPHS[item.char];
                const yOffset = item.yOffset || 0;
                const s = item.scale ? cellSize * item.scale : cellSize;

                for (let r = 0; r < matrix.length; r++) {
                    for (let c = 0; c < matrix[r].length; c++) {
                        if (matrix[r][c] === '1') {
                            const px = Math.round(cursorX + c * s);
                            const py = Math.round(baseY + yOffset + r * s);
                            const w = Math.ceil(s);
                            const h = Math.ceil(s);
                            octx.fillRect(px, py, w, h);
                        }
                    }
                }
                cursorX += matrix[0].length * s + (item.gap ?? s * 1.4);
            });

            // Passo 3: se houver brilho interno de Level Up, preencher levemente
            if (fillInteriorAlpha > 0.01) {
                cursorX = 12;
                octx.globalCompositeOperation = 'source-over';
                octx.fillStyle = `rgba(0, 255, 60, ${fillInteriorAlpha})`;
                glyphsList.forEach(item => {
                    if (item.char === ' ') {
                        cursorX += item.space;
                        return;
                    }
                    const matrix = PIXEL_GLYPHS[item.char];
                    const yOffset = item.yOffset || 0;
                    const s = item.scale ? cellSize * item.scale : cellSize;
                    for (let r = 0; r < matrix.length; r++) {
                        for (let c = 0; c < matrix[r].length; c++) {
                            if (matrix[r][c] === '1') {
                                const px = Math.round(cursorX + c * s);
                                const py = Math.round(baseY + yOffset + r * s);
                                octx.fillRect(px, py, Math.ceil(s), Math.ceil(s));
                            }
                        }
                    }
                    cursorX += matrix[0].length * s + (item.gap ?? s * 1.4);
                });
            }

            pixelGlyphCache.set(cacheKey, off);
            return off;
        }

function drawLetterS(ctx, x, y, w, h, color) {
            const t = 25; // espessura da barra
            const r = 20; // raio dos cantos externos arredondados
            ctx.fillStyle = color;

            ctx.beginPath();
            // Barra superior: começa na esquerda com canto superior-esquerdo arredondado
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w, y);
            ctx.lineTo(x + w, y + t);
            ctx.lineTo(x + t, y + t);
            // Desce pela esquerda até a barra central
            const midY = y + Math.round((h - t) / 2);
            ctx.lineTo(x + t, midY);
            // Vai para a direita com canto superior-direito arredondado
            ctx.lineTo(x + w - r, midY);
            ctx.quadraticCurveTo(x + w, midY, x + w, midY + r);
            // Desce pela direita até a base com canto inferior-direito arredondado
            ctx.lineTo(x + w, y + h - r);
            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            // Vai até a esquerda na barra inferior
            ctx.lineTo(x, y + h);
            ctx.lineTo(x, y + h - t);
            ctx.lineTo(x + w - t, y + h - t);
            ctx.lineTo(x + w - t, midY + t);
            // Fecha a parte inferior da barra central na esquerda
            ctx.lineTo(x, midY + t);
            // Sobe pela esquerda até o canto superior-esquerdo arredondado
            ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y);
            ctx.closePath();
            ctx.fill();
        }

        /**
         * Desenha a letra 'A' futurista em 2 peças (barra superior com gancho direito +
         * arco inferior separado por fenda horizontal), presente em SASI e em UFAC.
         */
        function drawLetterA(ctx, x, y, w, h, color) {
            const t = 25;
            const r = 20;
            const gapY = 9;
            ctx.fillStyle = color;

            // Peça 1: Capuz superior com canto superior-direito arredondado
            const capH = t + 4;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + w - r, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + r);
            ctx.lineTo(x + w, y + capH);
            ctx.lineTo(x + w - t, y + capH);
            ctx.lineTo(x + w - t, y + t);
            ctx.lineTo(x, y + t);
            ctx.closePath();
            ctx.fill();

            // Peça 2: Arco inferior (formato de ponte/arco geométrico)
            const bodyTop = y + capH + gapY;
            ctx.beginPath();
            ctx.moveTo(x, bodyTop);
            ctx.lineTo(x + w, bodyTop);
            ctx.lineTo(x + w, y + h);
            ctx.lineTo(x + w - t, y + h);
            ctx.lineTo(x + w - t, bodyTop + t + 2);
            ctx.lineTo(x + t, bodyTop + t + 2);
            ctx.lineTo(x + t, y + h);
            ctx.lineTo(x, y + h);
            ctx.closePath();
            ctx.fill();
        }

        /**
         * Desenha a letra 'I' de SASI
         */
        function drawLetterI(ctx, x, y, w, h, color) {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, w, h);
        }

        /**
         * Desenha a letra 'U' de UFAC (com a característica fenda entre a haste vertical
         * esquerda e a base curva inferior).
         */
        function drawLetterU(ctx, x, y, w, h, color) {
            const t = 25;
            const r = 18;
            const splitGap = 7;
            ctx.fillStyle = color;

            // Haste vertical esquerda (para antes da barra inferior)
            ctx.fillRect(x, y, t, h - t - splitGap);

            // Base inferior + haste vertical direita contínua
            ctx.beginPath();
            ctx.moveTo(x, y + h - t);
            ctx.lineTo(x + w - t, y + h - t);
            ctx.lineTo(x + w - t, y);
            ctx.lineTo(x + w, y);
            ctx.lineTo(x + w, y + h - r);
            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            ctx.lineTo(x + r * 0.4, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - r * 0.4);
            ctx.closePath();
            ctx.fill();
        }

        /**
         * Desenha a letra 'F' de UFAC
         */
        function drawLetterF(ctx, x, y, w, h, color) {
            const t = 25;
            ctx.fillStyle = color;
            // Haste esquerda
            ctx.fillRect(x, y, t, h);
            // Barra do topo
            ctx.fillRect(x, y, w, t);
            // Barra central
            const midY = y + Math.round((h - t) / 2);
            ctx.fillRect(x, midY, w - 4, t);
        }

        /**
         * Desenha a letra 'C' de UFAC
         */
        function drawLetterC(ctx, x, y, w, h, color) {
            const t = 25;
            const r = 20;
            const lip = 8;
            ctx.fillStyle = color;

            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w, y);
            ctx.lineTo(x + w, y + t + lip);
            ctx.lineTo(x + w - t, y + t + lip);
            ctx.lineTo(x + w - t, y + t);
            ctx.lineTo(x + t, y + t);
            ctx.lineTo(x + t, y + h - t);
            ctx.lineTo(x + w - t, y + h - t);
            ctx.lineTo(x + w - t, y + h - t - lip);
            ctx.lineTo(x + w, y + h - t - lip);
            ctx.lineTo(x + w, y + h);
            ctx.lineTo(x + r, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - r);
            ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y);
            ctx.closePath();
            ctx.fill();
        }

        /**
         * Desenha um retângulo com cantos arredondados compatível com qualquer navegador
         */
        function roundedRectPath(ctx, x, y, w, h, r) {
            const radius = Math.min(r, w / 2, h / 2);
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + w - radius, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
            ctx.lineTo(x + w, y + h - radius);
            ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
            ctx.lineTo(x + radius, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
        }

function renderLogoFrame(ctx, width, height, normalizedTime, isExportingGif = false) {
            ctx.clearRect(0, 0, width, height);
            ctx.save();

            // Movimento de flutuação suave estilo Menu Principal de Jogo
            const floatOffsetY = state.floatIdle
                ? Math.sin(normalizedTime * Math.PI * 2) * 3.5
                : 0;

            // Efeito Glitch ocasional
            let glitchShiftX = 0;
            let isGlitching = false;
            if (state.glitch) {
                const glitchWindow = (normalizedTime * 2) % 1;
                if (glitchWindow > 0.92 && glitchWindow < 0.97) {
                    isGlitching = true;
                    glitchShiftX = Math.sin(normalizedTime * 120) * 4;
                }
            }

            ctx.translate(0, floatOffsetY);

            // Cálculo de quantos blocos (de 1 a 19) estão preenchidos neste instante
            const totalBlocks = 19;
            let filledBlocks = 13;
            let isLevelUpMoment = false;

            if (state.loadingBar) {
                if (state.barMode === 'full-loop') {
                    // Sobe de 1 até 19 e segura no 19 brevemente para o flash "LEVEL UP"
                    const cycle = Math.floor(normalizedTime * 23);
                    filledBlocks = Math.min(totalBlocks, Math.max(1, cycle));
                    isLevelUpMoment = (filledBlocks === 19);
                } else if (state.barMode === 'pulse-13-19') {
                    const wave = (Math.sin(normalizedTime * Math.PI * 2) + 1) / 2;
                    filledBlocks = Math.round(11 + wave * 8);
                    isLevelUpMoment = (filledBlocks >= 18);
                } else {
                    filledBlocks = 13;
                    isLevelUpMoment = (normalizedTime > 0.75);
                }
            }

            // Atualiza indicador na UI e som se mudou o bloco (apenas na visualização ao vivo)
            if (!isExportingGif && filledBlocks !== state.lastFilledBlocks) {
                if (filledBlocks > state.lastFilledBlocks) {
                    play8BitSound(filledBlocks === 19 ? 'levelup' : 'step');
                }
                state.lastFilledBlocks = filledBlocks;
                const pct = Math.round((filledBlocks / totalBlocks) * 100);
                const statusEl = document.getElementById('barStatusText');
                if (statusEl) statusEl.textContent = `${filledBlocks}/19 (${pct}%)`;
            }

            // =====================================================================
            // MODO B: SE O USUÁRIO ENVIOU A IMAGEM ORIGINAL (logosasi.png)
            // =====================================================================
            // A logo é integralmente desenhada no mesmo Canvas: sem imagem ou barra sobreposta.
            // MODO A: VETOR HD NATIVO (RECRIAÇÃO FIEL DA LOGO SASI UFAC 2026)
            // =====================================================================

            // 1. TOPO ESQUERDO: "3ª EDIÇÃO" (Pixel Art Outline Vazado)
            const edicaoPulse = (state.levelUpGlow && isLevelUpMoment) ? 0.25 : 0;
            const edicaoCanvas = drawHollowPixelText(
                ctx,
                [
                    { char: '3' },
                    { char: 'ª', scale: 0.72, yOffset: -3, gap: 18 },
                    { char: 'E' },
                    { char: 'D' },
                    { char: 'I' },
                    { char: 'Ç' },
                    { char: 'Ã', yOffset: -12 },
                    { char: 'O' }
                ],
                4.2,
                2,
                (isLevelUpMoment && state.levelUpGlow) ? '#00ff33' : '#00b300',
                edicaoPulse
            );
            ctx.drawImage(edicaoCanvas, 20 + glitchShiftX, -6);

            // 2. CENTRO-ESQUERDA: "SASI"
            const sasiColor = '#00a800';
            const sasiY = 88;
            const sasiH = 122;

            ctx.save();
            if (state.glowLevel > 0 && !isExportingGif) {
                ctx.shadowColor = 'rgba(0, 220, 30, 0.35)';
                ctx.shadowBlur = state.glowLevel * 10;
            }

            // Efeito cromático 8-bit se estiver em instante de glitch
            if (isGlitching) {
                ctx.save();
                ctx.globalAlpha = 0.45;
                drawLetterS(ctx, 32 - 4, sasiY, 88, sasiH, '#00ff66');
                drawLetterA(ctx, 134 - 4, sasiY, 88, sasiH, '#00ff66');
                drawLetterS(ctx, 236 - 4, sasiY, 88, sasiH, '#00ff66');
                drawLetterI(ctx, 338 - 4, sasiY, 25, sasiH, '#00ff66');
                ctx.restore();
            }

            drawLetterS(ctx, 32 + glitchShiftX * 0.5, sasiY, 88, sasiH, sasiColor);
            drawLetterA(ctx, 134 + glitchShiftX * 0.5, sasiY, 88, sasiH, sasiColor);
            drawLetterS(ctx, 236 + glitchShiftX * 0.5, sasiY, 88, sasiH, sasiColor);
            drawLetterI(ctx, 338 + glitchShiftX * 0.5, sasiY, 25, sasiH, sasiColor);
            ctx.restore();

            // 3. CENTRO-DIREITA: CÁPSULA HALFTONE + "UFAC"
            const capX = 386;
            const capY = 58;
            const capW = 496;
            const capH = 172;
            const capR = capH / 2;

            // 3.1 Pontos Halftone Cinzas nos 4 cantos externos atrás da cápsula (fiéis ao PDF original)
            ctx.save();
            ctx.fillStyle = '#4a4a4a';
            const cornerRegions = [
                { x0: capX + 4, y0: capY + 2, x1: capX + 78, y1: capY + 60 },
                { x0: capX + 4, y0: capY + capH - 58, x1: capX + 95, y1: capY + capH + 2 },
                { x0: capX + capW - 78, y0: capY + 2, x1: capX + capW - 2, y1: capY + 60 },
                { x0: capX + capW - 88, y0: capY + capH - 58, x1: capX + capW - 2, y1: capY + capH + 2 }
            ];
            const dotSpacing = 12;
            cornerRegions.forEach(reg => {
                for (let gx = reg.x0; gx <= reg.x1; gx += dotSpacing) {
                    for (let gy = reg.y0; gy <= reg.y1; gy += dotSpacing) {
                        const rowShift = (Math.floor(gy / dotSpacing) % 2) * (dotSpacing / 2);
                        const px = gx + rowShift;
                        const py = gy;
                        // Raio cresce perto da cápsula
                        const r = 3.2;
                        ctx.beginPath();
                        ctx.arc(px, py, r, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            });
            ctx.restore();

            // 3.2 Corpo da Cápsula com recorte (Clip) e Matriz de Pontos LED Verdes Animados
            ctx.save();
            roundedRectPath(ctx, capX, capY, capW, capH, capR);
            ctx.clip();

            // Gradiente de fundo verde-floresta escuro (base) para verde vivo (topo)
            const capGrad = ctx.createLinearGradient(0, capY, 0, capY + capH);
            capGrad.addColorStop(0, '#00b800');
            capGrad.addColorStop(0.55, '#007a00');
            capGrad.addColorStop(1, '#002600');
            ctx.fillStyle = capGrad;
            ctx.fillRect(capX, capY, capW, capH);

            // Matriz Halftone / Painel de LEDs Arcade dentro da cápsula
            const step = 11.5;
            const phase = state.ledMatrix ? normalizedTime * Math.PI * 2 : 0;

            for (let y = capY - 6; y <= capY + capH + 6; y += step) {
                const rowIdx = Math.round((y - capY) / step);
                const offsetX = (rowIdx % 2) * (step * 0.5);
                for (let x = capX - 6; x <= capX + capW + 6; x += step) {
                    const dx = x + offsetX;
                    const dy = y;

                    // Onda diagonal estilo placar de Pinball / Arcade
                    const waveVal = state.ledMatrix
                        ? Math.sin((dx * 0.022) - (dy * 0.018) - phase * 2)
                        : 0;

                    // Pontos escuros que formam a textura halftone clássica da logo
                    const baseRadius = 3.6 + (waveVal * 0.75);
                    ctx.fillStyle = '#003800';
                    ctx.beginPath();
                    ctx.arc(dx, dy, Math.max(1.8, baseRadius), 0, Math.PI * 2);
                    ctx.fill();

                    // Flash de LED verde-brilhante percorrendo a matriz
                    if (state.ledMatrix && waveVal > 0.65) {
                        ctx.fillStyle = isLevelUpMoment ? '#80ff95' : '#00ff2a';
                        ctx.beginPath();
                        ctx.arc(dx, dy, 2.2, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            // Scanline sutil percorrendo a cápsula UFAC
            if (state.ledMatrix) {
                const scanY = capY + ((normalizedTime * capH * 1.4) % capH);
                const scanGrad = ctx.createLinearGradient(0, scanY - 12, 0, scanY + 12);
                scanGrad.addColorStop(0, 'rgba(0, 255, 50, 0)');
                scanGrad.addColorStop(0.5, 'rgba(0, 255, 50, 0.16)');
                scanGrad.addColorStop(1, 'rgba(0, 255, 50, 0)');
                ctx.fillStyle = scanGrad;
                ctx.fillRect(capX, scanY - 12, capW, 24);
            }

            // 3.3 Letras "UFAC" em Branco Puro dentro da cápsula
            const ufacY = 88;
            const ufacH = 122;
            const ufacColor = '#ffffff';

            ctx.save();
            if (isLevelUpMoment && state.levelUpGlow && !isExportingGif) {
                ctx.shadowColor = 'rgba(0, 255, 60, 0.7)';
                ctx.shadowBlur = 12;
            }
            drawLetterU(ctx, 444, ufacY, 88, ufacH, ufacColor);
            drawLetterF(ctx, 548, ufacY, 82, ufacH, ufacColor);
            drawLetterA(ctx, 644, ufacY, 88, ufacH, ufacColor);
            drawLetterC(ctx, 748, ufacY, 86, ufacH, ufacColor);
            ctx.restore();

            ctx.restore(); // Fim do clip da cápsula

            // 4. BASE ESQUERDA: BARRA DE PROGRESSO / LOADING GAMER (19 SLOTS)
            const barX = 32;
            const barY = 248;
            const barW = 656;
            const barH = 54;
            const barRadius = 11;

            ctx.save();
            const activeBarColor = (isLevelUpMoment && state.levelUpGlow) ? '#00ff33' : '#00a800';
            ctx.strokeStyle = activeBarColor;
            ctx.lineWidth = 4.5;
            if (state.glowLevel > 0 && isLevelUpMoment && !isExportingGif) {
                ctx.shadowColor = 'rgba(0, 255, 50, 0.6)';
                ctx.shadowBlur = 12;
            }
            roundedRectPath(ctx, barX, barY, barW, barH, barRadius);
            ctx.stroke();

            // 19 segmentos verticais internos
            const padX = 10;
            const padY = 8.5;
            const innerW = barW - padX * 2;
            const innerH = barH - padY * 2;
            const segGap = 6;
            const segW = (innerW - segGap * (totalBlocks - 1)) / totalBlocks;

            for (let i = 0; i < totalBlocks; i++) {
                const sx = barX + padX + i * (segW + segGap);
                const sy = barY + padY;

                if (i < filledBlocks) {
                    // Destaque luminoso no último bloco carregado (ponta da barra de XP)
                    const isTipBlock = (i === filledBlocks - 1 && state.loadingBar);
                    ctx.fillStyle = (isTipBlock || (isLevelUpMoment && state.levelUpGlow))
                        ? '#00ff33'
                        : '#00a800';
                    ctx.fillRect(sx, sy, segW, innerH);
                } else {
                    // Slot vazio com leve marcação translúcida opcional (totalmente limpa no GIF)
                    if (!isExportingGif) {
                        ctx.fillStyle = 'rgba(0, 168, 0, 0.08)';
                        ctx.fillRect(sx, sy, segW, innerH);
                    }
                }
            }
            ctx.restore();

            // 5. BASE DIREITA: "2026" (Pixel Art Outline Vazado ao lado da barra)
            const glow2026 = (isLevelUpMoment && state.levelUpGlow) ? 0.38 : 0;
            const canvas2026 = drawHollowPixelText(
                ctx,
                [
                    { char: '2', gap: 11 },
                    { char: '0', gap: 11 },
                    { char: '2', gap: 11 },
                    { char: '6', gap: 11 }
                ],
                5.4,
                2.2,
                (isLevelUpMoment && state.levelUpGlow) ? '#00ff33' : '#00b300',
                glow2026
            );

            ctx.save();
            const bounce2026 = (isLevelUpMoment && state.levelUpGlow)
                ? -Math.abs(Math.sin(normalizedTime * Math.PI * 8)) * 4
                : 0;
            ctx.drawImage(canvas2026, 696, 224 + bounce2026);
            ctx.restore();

            // 6. PARTÍCULAS PIXEL 8-BIT ("+1 UP" / Pixels flutuantes)
            if (state.particles && !isExportingGif) {
                for (let i = arcadeParticles.length - 1; i >= 0; i--) {
                    const p = arcadeParticles[i];
                    p.x += p.vx;
                    p.y += p.vy;
                    p.alpha -= 0.018;

                    if (p.alpha <= 0) {
                        arcadeParticles.splice(i, 1);
                        continue;
                    }

                    ctx.save();
                    ctx.globalAlpha = Math.max(0, p.alpha);
                    ctx.fillStyle = p.color;
                    if (p.isText) {
                        ctx.font = 'bold 11px "Press Start 2P", monospace';
                        ctx.fillText(p.label, p.x, p.y);
                    } else {
                        ctx.fillRect(p.x, p.y, p.size, p.size);
                    }
                    ctx.restore();
                }
            }

            ctx.restore();
        }


let frameId = null;
let isOnScreen = true;
let lastTimestamp = 0;
let lastDraw = 0;
let clock = 0;
let boostUntil = 0;
function renderStatic() {
  const staticState = { ...state };
  state.floatIdle = false;
  state.ledMatrix = false;
  state.particles = false;
  state.loadingBar = false;
  state.levelUpGlow = false;
  renderLogoFrame(context, BASE_WIDTH, BASE_HEIGHT, 0, true);
  Object.assign(state, staticState);
}
function frame(timestamp) {
  if (!isOnScreen || document.hidden || reducedMotion.matches) { frameId = null; return; }
  if (!lastTimestamp) lastTimestamp = timestamp;
  const delta = Math.min(70, Math.max(0, timestamp - lastTimestamp));
  lastTimestamp = timestamp;
  clock = (clock + delta * .00032 * (timestamp < boostUntil ? 1.8 : 1)) % 1;
  if (timestamp - lastDraw >= 32) {
    renderLogoFrame(context, BASE_WIDTH, BASE_HEIGHT, clock, false);
    lastDraw = timestamp;
  }
  frameId = requestAnimationFrame(frame);
}
function stop() {
  if (frameId !== null) cancelAnimationFrame(frameId);
  frameId = null;
  lastTimestamp = 0;
}
function start() {
  if (reducedMotion.matches) { stop(); renderStatic(); return; }
  if (frameId === null && isOnScreen && !document.hidden) frameId = requestAnimationFrame(frame);
}
function boost() {
  if (reducedMotion.matches) return;
  boostUntil = performance.now() + 1100;
  for (let i = 0; i < 10; i++) spawnParticle();
}
const trigger = document.getElementById("hero-logo-stage");
trigger?.addEventListener("mouseenter", boost);
trigger?.addEventListener("focus", boost);
trigger?.addEventListener("click", boost);
reducedMotion.addEventListener?.("change", () => { stop(); start(); });
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stop();
  else start();
});
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(([entry]) => {
    isOnScreen = entry.isIntersecting;
    if (isOnScreen) start();
    else stop();
  }, { threshold: 0.05 });
  observer.observe(canvas);
}
start();
} // canvas context
} // canvas element
