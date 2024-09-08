import '#server/env/load';

import express from 'express';
import { joinURL } from 'ufo';

import * as emailTemplatesMap from '../templates';

const app = express();

app.use(express.static('dist/public'));

app.get('/', (req, res) => {
  return res.type('text/html').send(`
  <ul>
    ${Object.keys(emailTemplatesMap)
      .map(
        (templateName) => `<li>
        <a href="${joinURL(req.baseUrl, templateName)}">
          ${templateName}
        </a>
      </li>`,
      )
      .join('\n')}
  </ul>
  `);
});

app.get('/:id', (req, res) => {
  const { id: templateName } = req.params;

  const template =
    emailTemplatesMap[templateName as keyof typeof emailTemplatesMap];

  if (!template) {
    return res.sendStatus(404).jsonp;
  }

  const { html } = template(template.previewProps as any);

  return res.type('text/html').send(html);
});

app.listen(3e3, () =>
  console.log('Email templates dev server is up and running !'),
);
