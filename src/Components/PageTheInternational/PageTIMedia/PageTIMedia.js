import React from 'react';
import { Timeline } from 'react-twitter-widgets';
class PageTIMedia extends React.PureComponent {


  render() {
    return (
      <div>
        <div id="twitter-timeline">
        <Timeline
   dataSource={{
     sourceType: 'profile',
     screenName: 'dota2'
   }}
   options={{
     username: 'dota2',
     height: '1000',
     chrome: 'noscrollbar transparent'
   }}
 />
</div>

      </div>
    )
  }
}

export default PageTIMedia
