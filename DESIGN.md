# DESIGN.md

## 1. Visao Geral

Este documento define o sistema visual do projeto com base em principios do Material Design, mantendo uma estetica moderna, elegante, limpa e premium.

O objetivo e criar uma interface consistente, responsiva e facil de manter, usando tokens de design para controlar tipografia, espacamento, cores, bordas, elevacao, movimento e componentes.

A identidade visual deve transmitir modernidade, sofisticacao, clareza, boa leitura, consistencia, sensacao premium e design limpo.

## 2. Principios Visuais

1. Clareza antes de decoracao.
2. Hierarquia visual bem definida.
3. Tipografia elegante, sem excesso de peso.
4. Espacamentos consistentes.
5. Componentes reutilizaveis.
6. Estados de interacao visiveis.
7. Layout responsivo.
8. Uso controlado de uppercase.
9. Interface forte, mas nao agressiva.
10. Visual alinhado a boas praticas de Material Design.

## 3. Fonte Principal

A fonte principal do projeto e:

```css
font-family: "Sora", sans-serif;
```

Sora deve ser usada em toda a interface: hero, headlines, cards, corpo de texto, navegacao, botoes, chips, labels e captions.

## 4. Import da Fonte

Usar este import no `code.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

Pesos utilizados:

```txt
400: body e textos comuns
500: headlines sutis, cards e titulos elegantes
600: labels, botoes e destaques
700: hero e titulos de maior impacto
800: uso raro, apenas quando precisar de maximo impacto
```

## 5. Direcao Tipografica

A tipografia deve ser elegante e sutil. Os headlines nao devem parecer pesados ou agressivos. Por isso, os titulos principais usam pesos entre `500` e `600`.

O peso `700` deve ser reservado para o hero ou elementos de maior impacto.

Evitar o uso excessivo de `font-weight: 800`, uppercase em titulos longos, headlines muito grandes em blocos pequenos e tracking apertado em textos menores.

## 6. Escala Tipografica

| Style | Size | Line Height | Weight | Uso |
| --- | ---: | ---: | ---: | --- |
| Display 1 | 96px | 100px | 700 | Hero principal desktop |
| Display 2 | 72px | 78px | 700 | Hero secundario |
| Heading 1 | 56px | 64px | 600 | Titulo principal de pagina |
| Heading 2 | 48px | 56px | 500 | Titulos principais de secao |
| Heading 3 | 36px | 44px | 500 | Blocos internos / contato |
| Heading 4 | 28px | 36px | 500 | Titulos de cards grandes |
| Title | 24px | 32px | 500 | Cards, projetos e subtitulos |
| Body Regular | 16px | 26px | 400 | Texto comum |
| Body Medium | 16px | 26px | 500 | Destaques leves |
| Small | 14px | 22px | 400 | Texto auxiliar |
| Caption | 12px | 16px | 500 | Legendas e metadados |
| Label | 12px | 12px | 600 | Navegacao, chips e tags |
| Button | 12px | 16px | 600 | Botoes e CTAs |

## 7. Tokens CSS Globais

```css
:root {
  --font-main: "Sora", sans-serif;

  --display-1-size: 96px;
  --display-1-line: 100px;
  --display-1-weight: 700;

  --display-2-size: 72px;
  --display-2-line: 78px;
  --display-2-weight: 700;

  --heading-1-size: 56px;
  --heading-1-line: 64px;
  --heading-1-weight: 600;

  --heading-2-size: 48px;
  --heading-2-line: 56px;
  --heading-2-weight: 500;

  --heading-3-size: 36px;
  --heading-3-line: 44px;
  --heading-3-weight: 500;

  --heading-4-size: 28px;
  --heading-4-line: 36px;
  --heading-4-weight: 500;

  --title-size: 24px;
  --title-line: 32px;
  --title-weight: 500;

  --body-size: 16px;
  --body-line: 26px;
  --body-weight: 400;
  --body-medium-weight: 500;

  --small-size: 14px;
  --small-line: 22px;
  --small-weight: 400;

  --caption-size: 12px;
  --caption-line: 16px;
  --caption-weight: 500;

  --label-size: 12px;
  --label-line: 12px;
  --label-weight: 600;

  --button-size: 12px;
  --button-line: 16px;
  --button-weight: 600;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-30: 120px;

  --radius-xs: 6px;
  --radius-sm: 8px;
  --radius-md: 8px;
  --radius-lg: 8px;
  --radius-xl: 8px;
  --radius-full: 999px;

  --elevation-0: none;
  --elevation-1: 0 1px 2px rgba(0, 0, 0, 0.08);
  --elevation-2: 0 4px 12px rgba(0, 0, 0, 0.12);
  --elevation-3: 0 8px 24px rgba(0, 0, 0, 0.16);

  --motion-fast: 120ms;
  --motion-default: 180ms;
  --motion-slow: 300ms;

  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-emphasized: cubic-bezier(0.2, 0, 0, 1);
}
```

## 8. Regras de Uppercase

Uppercase pode ser usado em logo, botoes, chips, labels, navegacao, tags e microtextos.

Evitar uppercase em titulos de secao, titulos de cards, blocos de contato, textos longos, subtitulos e descricoes.

```css
.heading-1,
.heading-2,
.heading-3,
.heading-4,
.title {
  text-transform: none;
}

.label,
.button-text,
.chip,
.nav-link {
  text-transform: uppercase;
}
```

## 9. Responsividade Tipografica

```css
@media (max-width: 768px) {
  :root {
    --display-1-size: 56px;
    --display-1-line: 62px;
    --display-2-size: 48px;
    --display-2-line: 54px;
    --heading-1-size: 40px;
    --heading-1-line: 48px;
    --heading-2-size: 32px;
    --heading-2-line: 40px;
    --heading-3-size: 28px;
    --heading-3-line: 36px;
    --heading-4-size: 24px;
    --heading-4-line: 32px;
    --title-size: 22px;
    --title-line: 30px;
    --label-size: 10px;
    --label-line: 10px;
  }
}
```

## 10. Elementos

### Logo

Fonte Sora, peso 700, tamanho 28px a 48px. Uppercase opcional.

### Hero

Fonte Sora, peso 700, ate 96px no desktop e 56px no mobile. O hero e o unico lugar de maximo impacto tipografico.

### Titulos de Secao

Fonte Sora, peso 500, 48px desktop e 32px mobile. Nao usar uppercase por padrao.

### Titulos Internos

Fonte Sora, peso 500, entre 28px e 36px. Nao usar uppercase por padrao.

### Cards

Fonte Sora, peso 500, entre 24px e 28px. Cards devem priorizar clareza e padding consistente.

### Corpo de Texto

Fonte Sora, peso 400, 16px, line-height 26px.

### Labels

Fonte Sora, peso 600, 10px a 12px. Uppercase permitido.

### Botoes

Fonte Sora, peso 600, 12px, uppercase permitido e altura minima de 48px.

### Contato

O contato deve ser elegante, claro e menos pesado.

```css
.contact-title {
  font-family: var(--font-main);
  font-size: clamp(32px, 5vw, 48px);
  line-height: 1.15;
  font-weight: 500;
  text-transform: none;
}
```

## 11. Checklist de Qualidade

- A hierarquia esta clara?
- O hero e o unico elemento com maximo impacto?
- Os headlines estao elegantes e sutis?
- Ha excesso de uppercase?
- Os cards tem padding consistente?
- Os botoes tem no minimo 48px de altura?
- O espacamento segue a escala?
- Os textos estao confortaveis para leitura?
- O mobile esta com titulos menores?
- Os estados de hover, active e focus existem?
- A interface parece premium, e nao pesada?

## 12. Direcao Final

A interface deve parecer moderna, elegante, sutil, premium, limpa, consistente, responsiva e forte sem agressividade visual.

Regra principal:

```txt
O hero pode ter impacto.
As secoes devem ter elegancia.
Os cards devem ter clareza.
O texto deve ter conforto.
Os labels e botoes devem ter precisao.
```
