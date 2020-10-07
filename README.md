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
      <strong>position: string</strong> | <strong>ver leganda</strong>
      <strong>height: number</strong>   | em pixels
      <strong>widtht: number</strong>   | em pixels
      <strong>scale: number</strong>    | em decimal
    }</pre>
  </li>
</ul>

##### Legenda

<table class="tabela">
  <tr>
    <th>Valor</th>
    <th>Posição em X</th>
    <th>Posição em Y</th>
  </tr>
  <tr>
    <td>0-0</td>
    <td>Esquerda</td>
    <td>Cima</td>
  </tr>
  <tr>
    <td>1-0</td>
    <td>Direita</td>
    <td>Cima</td>
  </tr>
  <tr>
    <td>0-1</td>
    <td>Esquesda</td>
    <td>Baixo</td>
  </tr>
  <tr>
    <td>1-1</td>
    <td>Direita</td>
    <td>Baixo</td>
  </tr>
</table>
  
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


<style>
.tabela {
  margin-left: 80px;
}

.tabela th {
  text-align: center;
  font-size: 12px;
}

.tabela td {
  text-align: center;
  font-size: 12px;
}
</style>