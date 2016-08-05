'use babel';

import AtomSublimeMessageView from './atom-sublime-message-view';
import { CompositeDisposable } from 'atom';

export default {

  atomSublimeMessageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomSublimeMessageView = new AtomSublimeMessageView(state.atomSublimeMessageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomSublimeMessageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-sublime-message:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomSublimeMessageView.destroy();
  },

  serialize() {
    return {
      atomSublimeMessageViewState: this.atomSublimeMessageView.serialize()
    };
  },

  toggle() {
    console.log('AtomSublimeMessage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
