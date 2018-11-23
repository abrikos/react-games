import {observable, computed, asStructure} from 'mobx';
import jquery from 'jquery';

export class UiState {
    @observable language = "en_US";
    @observable pendingRequestCount = 0;

    // .struct makes sure observer won't be signaled unless the
    // dimensions object changed in a deepEqual manner
    @observable.struct windowDimensions = {
        width: jquery(window).width(),
        height: jquery(window).height()
    };

    constructor() {
        jquery.resize(() => {
            this.windowDimensions = getWindowDimensions();
        });
    }

    @computed get appIsInSync() {
        return this.pendingRequestCount === 0
    }
}