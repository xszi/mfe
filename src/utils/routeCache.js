import { getBrowserCache, setBrowserCache } from '@/utils/util'
import actions from '@/shared/actions'
import EventBus from './eventBus'
function addView(view) {
  addVisitedView(view)
  addCachedView(view)
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

function addCachedView(view) {
  const cachedViews = JSON.parse(getBrowserCache('cachedViews'))
  if (cachedViews.includes(view.name)) return
  if (!view.meta.noCache) {
    cachedViews.push(view.name)
  }
  setBrowserCache('cachedViews', JSON.stringify(cachedViews))
}

function delView(view) {
  delVisitedView(view)
  delCachedView(view)
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

function delCachedView(view) {
  const cachedViews = JSON.parse(getBrowserCache('cachedViews'))
  const index = cachedViews.indexOf(view.name)
  index > -1 && cachedViews.splice(index, 1)
  setBrowserCache('cachedViews', JSON.stringify(cachedViews))
}

function delOthersViews(view) {
  delOthersVisitedViews(view)
  delOthersCachedViews(view)
}

function delOthersVisitedViews(view) {
  let visitedViews = JSON.parse(getBrowserCache('visitedViews'))
  visitedViews = visitedViews.filter(v => {
    return v.meta.affix || v.path === view.path
  })
  setBrowserCache('visitedViews', JSON.stringify(visitedViews))
}

function delOthersCachedViews(view) {
  let cachedViews = getBrowserCache('cachedViews')
  const index = cachedViews.indexOf(view.name)
  if (index > -1) {
    cachedViews = cachedViews.slice(index, index + 1)
  } else {
    // if index = -1, there is no cached tags
    cachedViews = []
  }
  setBrowserCache('cachedViews', JSON.stringify(cachedViews))
}

function delAllVisitedViews(view) {
  let visitedViews = getBrowserCache('visitedViews')
  const affixTags = visitedViews.filter(tag => tag.meta.affix)
  visitedViews = affixTags
  setBrowserCache('visitedViews', JSON.stringify(visitedViews))
}

function delAllCachedViews(view) {
  setBrowserCache('cachedViews', [])
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
  addCachedView,
  delView,
  delVisitedView,
  delCachedView,
  delOthersViews,
  delOthersVisitedViews,
  delOthersCachedViews,
  delAllVisitedViews,
  delAllCachedViews,
  updateVisitedView
}
