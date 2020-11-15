/**
 * @file app.js
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 20/02/2019
 *
 */

if (window.netlifyIdentity) {
  window.netlifyIdentity.on('init', user => {
    if (!user) {
      window.netlifyIdentity.on('login', () => {
        document.location.href = '/admin/'
      })
    }
  })
}

if (window.CMS) {
  CMS.registerPreviewStyle('/style.css')
  CMS.registerPreviewTemplate(
    'post',
    createClass({
      render() {
        var entry = this.props.entry
        return h('div', { className: 'post' }, [
          h('article', { className: 'post-block' },
            h('h1', {}, entry.getIn(['data', 'title'])),
            h(
              'div',
              { className: 'post-info' },
              h('time', {}, String(entry.getIn(['data', 'datetime'])))
            )
          ),
          h(
            'div',
            { className: 'post-content' },
            h('article', {}, this.props.widgetFor('body'))
          )
        ])
      }
    })
  )
}
