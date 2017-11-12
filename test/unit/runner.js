import Jasmine from 'jasmine';
import { SpecReporter } from 'jasmine-spec-reporter';

const jasmine = new Jasmine();
const reporter = new SpecReporter({
  spec: {
    displayPending: true,
  },
});

jasmine.env.clearReporters();
jasmine.env.addReporter(reporter);
jasmine.loadConfigFile('test/unit/jasmine.json');
jasmine.execute();
