import HtmlUtils from './utils/HTMLUtil'


export const WIDGET_UI = 'Widget_UI'

export default class WidgetUIAdaptor {

  constructor(gameSparksHandler) {
    this.widgetUI = document.createElement('div')
    //This is the id the widget appends children to (do not change the name, unless you change the name in the FeatureUI project as well)
    this.widgetUI.id = 'featureWidget'
    this.widgetUI.zIndex = 10002
    this.widgetFailedToLoad = false
    this.gameSparksHander = gameSparksHandler


    this.loadWidgetScript()
      .then((result) => {
        this.widget = window.featureWidget
        this.widget.initWidget(this.gameSparksHander)
      })
      .catch((err) => {
        this.widgetFailedToLoad = true
      })

    this.handleFeatureNotification = (data) => {
      this.sendNotificationToWidget(data)
    }
  }

  loadWidgetScript() {
    return new Promise((resolve, reject) => {
      HtmlUtils.asyncAppendToBody(this.widgetUI)
        .then((result) => {
          HtmlUtils.addScript(this.gameSparksHander.gcmOrigin + '/feature-ui-widget/js/main.js')
            .then((result) => {
              resolve();
            })
            .catch((err) => {
              document.body.removeChild(this.widgetUI)
              reject();
            })
        })
        .catch((err) => {
          reject();
        })
    })
  }

  sendNotificationToWidget(data) {
    if (this.widgetFailedToLoad)
      return

    if (this.widget) {
      this.widget.handleFeatureUpdates(data)
    } else {
      setTimeout(() => {
        this.handleFeatureNotification(data)
      }, 1000)
    }
  }
}


// WEBPACK FOOTER //
// ./src/main/WidgetUIAdaptor.js