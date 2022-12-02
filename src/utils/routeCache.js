import { getBrowserCache, setBrowserCache } from '@/utils/util'
import actions from '@/shared/actions'
import EventBus from './eventBus'
function addView(view) {
  addVisitedView(view)
}

function addVisitedView(view) {
  const visitedViews = JSON.parse(getBrowserCache('visitedViews'))
  if (visitedViews.some(v => v.fullPath === view.fullPath)) return
  if (visitedViews.some(v => v.path === view.path)) {
    visitedViews.forEach(v => {
      if (v.path === view.path) {
        v.fullPath = view.fullPath
      }
    })
  } else {
    const handleView = {
      name: view.name,
      path: view.path,
      query: view.query,
      params: view.params,
      fullPath: view.fullPath,
      title: view.meta.title,
      noCache: view.meta.noCache
    }
    visitedViews.push(handleView)
  }

  actions.setGlobalState({ visitedViews })
  setBrowserCache('visitedViews', JSON.stringify(visitedViews))
  EventBus.$emit('setRouteCache')
}

function delView(view) {
  delVisitedView(view)
}

function delVisitedView(view) {
  const visitedViews = JSON.parse(getBrowserCache('visitedViews'))
  for (const [i, v] of visitedViews.entries()) {
    if (v.path === view.path) {
      visitedViews.splice(i, 1)
      break
    }
  }
  actions.setGlobalState({ visitedViews })
  setBrowserCache('visitedViews', JSON.stringify(visitedViews))
  EventBus.$emit('setRouteCache')
}

function delOthersViews(view) {
  delOthersVisitedViews(view)
}

function delOthersVisitedViews(view) {
  let visitedViews = JSON.parse(getBrowserCache('visitedViews'))
  visitedViews = visitedViews.filter(v => {
    return v.meta.affix || v.path === view.path
  })
  setBrowserCache('visitedViews', JSON.stringify(visitedViews))
}

function delAllVisitedViews(view) {
  let visitedViews = getBrowserCache('visitedViews')
  const affixTags = visitedViews.filter(tag => tag.meta.affix)
  visitedViews = affixTags
  setBrowserCache('visitedViews', JSON.stringify(visitedViews))
}

function updateVisitedView(view) {
  const visitedViews = JSON.parse(getBrowserCache('visitedViews'))
  for (let v of visitedViews) {
    if (v.path === view.path) {
      v = Object.assign(v, view)
      break
    }
  }
  setBrowserCache('visitedViews', JSON.stringify(visitedViews))
}

export const routeCache = {
  addView,
  addVisitedView,
  delView,
  delVisitedView,
  delOthersViews,
  delOthersVisitedViews,
  delAllVisitedViews,
  updateVisitedView
}
