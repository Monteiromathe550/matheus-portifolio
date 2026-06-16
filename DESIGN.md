# DESIGN.md

## 1. Visao Geral

Este documento define o sistema visual do portfolio de Matheus Monteiro. A direcao atual e premium, escura, precisa e calma, com foco em leitura, prova visual e caminho claro para contato.

O site deve parecer autoral sem ficar barulhento. O hero pode concentrar o maior impacto; as secoes internas precisam sustentar confianca com ritmo, contraste, imagens reais dos projetos e formulários leves.

## 2. Principios Visuais

1. Clareza antes de decoracao.
2. Hero forte, secoes internas mais precisas.
3. Prova visual deve aparecer cedo, especialmente em Projetos.
4. Tipografia com personalidade, mas sem tracking apertado ou peso excessivo.
5. Espacamento generoso no scroll natural e compacto em entradas por ancora.
6. Estados de foco, hover, envio e erro sempre visiveis.
7. Mobile sem overflow e com alvos de toque confortaveis.
8. Uppercase apenas em labels curtos, navegacao, chips e botoes.
9. Cards devem ter funcao clara; evitar cards decorativos ou repeticao sem informacao.
10. O contato deve pedir o essencial e reduzir pressao comercial inicial.

## 3. Sistema Tipografico

O projeto usa Chillax como voz principal da marca, com Inter e Segoe UI como fallback:

```css
--font-body: "Chillax", "Inter", "Segoe UI", sans-serif;
--font-label: "Chillax", "Inter", "Segoe UI", sans-serif;
--font-display-face: "Chillax", "Inter", "Segoe UI", sans-serif;
```

Chillax carrega display, corpo, navegacao, botoes, chips, labels e campos de formulario. A assinatura vem da escala, peso e composicao, nao de muitas familias tipograficas.

## 4. Pesos e Uso

```txt
Chillax 400: corpo, descricoes e textos de apoio
Chillax 500: titulos internos, cards e destaques leves
Chillax 600: hero, headings e chamadas principais
Chillax 700: logo, navegacao, botoes e microdestaques pontuais
Inter/Segoe UI: fallback tecnico quando Chillax nao carregar
```

Evitar `font-weight: 800`, uppercase em frases longas, subtitulos muito grandes em cards pequenos e repeticao de kickers quando a secao ja esta clara.

## 5. Escala Tipografica

| Style | Size | Line Height | Weight | Uso |
| --- | ---: | ---: | ---: | --- |
| Display 1 | clamp(2.9rem, 5.2vw, 4.6rem) | 1.02 | 600 | Hero principal |
| Heading 1 | clamp(2.1rem, 4.1vw, 4.45rem) | 1.05 | 600 | Grandes chamadas |
| Heading 2 | clamp(2rem, 3vw, 3.15rem) | 1.08 | 600 | Titulos de secao |
| Heading 3 | clamp(1.35rem, 2vw, 2rem) | 1.12 | 500 | Blocos internos |
| Title | 1.18rem a 1.45rem | 1.2 | 500 | Cards e projetos |
| Body | 1rem | 1.6 a 1.75 | 400 | Texto comum |
| Small | 0.84rem a 0.92rem | 1.45 | 400-500 | Ajuda, descricao e metadados |
| Label | 0.68rem a 0.75rem | 1 | 700 | Navegacao, chips, field labels |
| Button | 0.72rem a 0.78rem | 1 | 700 | CTAs |

## 6. Tokens CSS Principais

```css
:root {
  --background: oklch(0.055 0.004 95);
  --foreground: oklch(0.955 0.012 88);
  --primary: oklch(0.955 0.012 88);
  --primary-foreground: oklch(0.055 0.004 95);
  --secondary: oklch(0.74 0.057 91);
  --muted-foreground: oklch(0.72 0.008 88);
  --border: oklch(0.955 0.012 88 / 0.14);
  --field-surface: oklch(0.075 0.005 95);
  --field-border: oklch(0.955 0.012 88 / 0.3);
  --ring: oklch(0.955 0.012 88 / 0.36);
}
```

A paleta deve continuar escura e contida. O acento quente aparece como precisao, nao como gradiente dominante. Texto de corpo precisa manter contraste confortavel contra o fundo escuro.

## 7. Regras de Componentes

### Hero

O hero e o ponto de maximo impacto. Deve preservar fundo escuro, shader sutil, headline central, CTA principal e link para trabalhos.

### Projetos

Projetos devem mostrar prova visual rapidamente. Ao entrar por `#projetos`, o visitante precisa ver titulo, contexto e ao menos parte do primeiro card/imagem sem rolar muito.

### Contato

Contato deve pedir o essencial:

```txt
Nome
E-mail
Tipo de projeto
Mensagem
Orcamento opcional
```

Orcamento nao deve bloquear envio. A opcao "Ainda nao sei" reduz friccao e protege visitantes que ainda estao no primeiro contato.

### Ancoras

Entradas por navegacao fixa devem usar offset compacto. Nenhuma ancora deve abrir com resto cortado da secao anterior como primeiro foco visual.

## 8. Checklist de Qualidade

- O hero continua sendo a maior peca visual?
- Projetos mostra trabalho real cedo?
- As ancoras entram limpas em desktop e mobile?
- O formulario evita escolhas demais ao mesmo tempo?
- Orcamento esta opcional e sem pressao?
- Chillax esta documentada como fonte real da marca?
- Os textos mantem contraste no fundo escuro?
- O mobile em 390px nao tem overflow horizontal?
- Focus visible aparece em links, botoes, campos e controles?
- O visual parece premium e preciso, sem parecer template generico?

## 9. Direcao Final

```txt
O hero cria impacto.
Projetos prova valor.
Contato reduz atrito.
As secoes internas mantem precisao.
O sistema escuro deve parecer autoral, nao pesado.
```
