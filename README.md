# drag-and-drop

### url:https://ruanvfachini.github.io/drag-and-drop-vuejs/

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).



# Documentação:

## componentes 

### Diagram

````
<Diagram v-model="data" @edit-item="openEdit" :zoomCfg="zoomPanelConfig" >
````

#### Parâmetros

<ul>
  <li>
  <pre>v-model: {
      <strong>actions: []</strong>  | lista de cards
      <strong>links: []</strong>    | lista de conexões
    }</pre>
  </li>
  <li>
    <pre>zoomCfg: {
      <strong>position: string</strong> | opções('1-1', '0-1', '1-0', '0-0')
      <strong>height: number</strong>   | em pixels
      <strong>widtht: number</strong>   | em pixels
      <strong>scale: number</strong>    | em decimal
    }</pre>
  </li>
</ul>

#### Eventos

<ul>
  <li>
    <p>edit-item($event)</p>
    <pre><strong>$event</strong>: {
  <strong>title</strong>: string,
  <strong>description</strong>: string,
  <strong>name</strong>: string,
  <strong>x</strong>: number,
  <strong>y</strong>: number,
  <strong>input</strong>: {},
  <strong>output</strong>: {},
  <strong>alterput</strong>: {}
}
    </pre>
  </li>
</ul>