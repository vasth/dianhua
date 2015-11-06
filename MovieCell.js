/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  Image,
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} = React;

//var getStyleFromScore = require('./getStyleFromScore');
//var getImageSource = require('./getImageSource');
//var getTextFromScore = require('./getTextFromScore');

var MovieCell = React.createClass({
  getrating :function(score: Number){
    switch (Math.round(score)){
      case 0:
        return '☆☆☆☆☆';
      case 1:
        return '★☆☆☆☆';
      case 2:
        return '★★☆☆☆';
      case 3:
        return '★★★☆☆';
      case 4:
        return '★★★★☆';
      case 5:
        return '★★★★★';
    }

    return
  },
  render: function() {
    var criticsScore = this.props.movie.detail_info.service_rating;
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return (
      <View>
        <TouchableElement
          onPress={this.props.onSelect}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onUnhighlight}>
          <View style={styles.row}>
            {/* $FlowIssue #7363964 - There's a bug in Flow where you cannot
              * omit a property or set it to undefined if it's inside a shape,
              * even if it isn't required */}
            <Image
              source={getImageSource(this.props.movie, 'det')}
              style={styles.cellImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.movieTitle} numberOfLines={2}>
                {this.props.movie.name}
              </Text>
              <Text style={styles.movieYear} numberOfLines={1}>
                电话: {this.props.movie.telephone}
              </Text>
              <Text style={styles.movieYear} numberOfLines={1}>
                评分: {this.props.movie.detail_info.overall_rating}  {' '}&bull;{' '}
                <Text style={styles.rating} numberOfLines={1}>
                  {this.getrating(this.props.movie.detail_info.overall_rating)}
                </Text>
              </Text>
              <Text style={styles.movieYear}numberOfLines={1}>
                地址: {this.props.movie.address}
              </Text>
            </View>
            <View style={styles.cellTel}>
              <View style={styles.telbtn}><Text style={{color:'#fff'}}>拨号</Text></View>
            </View>
          </View>
        </TouchableElement>
      </View>
    );
  }
});
//{' '}&bull;{' '} 这是个点
var getImageSource = function (movie: Object, kind: ?string): {uri: ?string} {
  //var uri = movie && movie.posters ? movie.posters.thumbnail : null;
  //if (uri && kind) {
  //  uri = uri.replace('tmb', kind);
  //}
  //return { uri };
  return 'http://webmap0.map.bdimg.com/maps/services/thumbnails?width=150&height=120&align=center,center&quality=80&src=http%3A%2F%2Ft12.baidu.com%2Fit%2Fu%3D3307923632%2C1799560491%26fm%3D22';
}

var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  movieTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  movieYear: {
    color: '#999999',
    fontSize: 12,
  },
  rating:{
    color:'#FFB90F',
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
    height: 93,
    margin:0,
  },
  telbtn:{
    height: 36,
    width:80,
    margin : 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#43CD80',
    borderRadius: 3,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 93,
    marginRight: 10,
    width: 60,
  },
  cellTel: {
    height: 93,
    width: 100,
  },
  cellBorder: {//暂时不知道有什么用
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    // Trick to get the thinest line the device can display
    height: 1 / PixelRatio.get(),
    marginLeft: 4,
  },
});

module.exports = MovieCell;
