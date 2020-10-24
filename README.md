# drag-and-drop

### url:https://ruanvfachini.github.io/workflow-diagram-vue/

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


<div class="section">
  <ul>
    <li>
    <h5 class="titulo-parametro">Elemento principal do diagrama:</h5>
    <p class="section-content">Entrada do array de cards e ligações do diagrama</p>
    <pre>v-model: {
        <strong>actions: []</strong>  | lista de cards
        <strong>links: []</strong>    | lista de conexões
      }</pre>
    </li>
    <li>
      <h5 class="titulo-parametro">Display de zoom do diagrama:</h5>
      <p class="section-content">Parâmetros de entrada componente de zoom</p>
      <pre>zoomCfg: {
        <strong>position: string</strong> | <strong>ver leganda</strong>
        <strong>height: number</strong>   | em pixels
        <strong>widtht: number</strong>   | em pixels
        <strong>scale: number</strong>    | em decimal
      }</pre>
    </li>
  </ul>

  <div class="legenda">
  <h5 class="titulo-legenda">Legenda:</h5>
  <p class="section-content">Parâmetro de entrada para posicionamento do componente de zoom</p>
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
  </div>
</div>


#### Eventos

<div class="section">
  <ul>
    <li>
      <h5 class="titulo-parametro">edit-item($event):</h5>
      <p class="section-content"> Evento emitido sempre que o botão editar é clicado dentro de um card do diagrama</p>
      <pre>$event: {
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
</div>
