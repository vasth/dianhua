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
 * @providesModule UIExplorerApp
 * @flow
 */
'use strict';

var React = require('react-native');

var {
    AppRegistry,
    BackAndroid,
    Text,
    View,
    Navigator,
    StyleSheet,
    ToolbarAndroid,
    ToastAndroid,
    } = React;

var ToolbarAndroid = require('ToolbarAndroid');

var MainScreen = require('./MainScreen.android');
var StoryScreen = require('./StoryScreen');

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', function() {
    if (_navigator && _navigator.getCurrentRoutes().length > 1) {
        _navigator.pop();
        return true;
    }
    return false;
});

var dianhua = React.createClass({
    componentDidMount: function() {
        //this.setTimeout(
        //    () => {
        //        this.setState({splashed: true});//更新界面将splash页面跳过去
        //    },
        //    2000
        //);
    },
   // RouteMapper: function(route, navigationOperations, onComponentRef) {
    RouteMapper: function(route, navigationOperations) {//这里应该没有第三个参数
        _navigator = navigationOperations;
        if (route.name === 'home') {
            return (
                <View style={styles.container}>
                    <MainScreen navigator={navigationOperations}/>
                </View>
            );
        } else if (route.name === 'story') {
            return (
                <View style={styles.container}>
                    <StoryScreen
                        style={{flex: 1}}
                        navigator={navigationOperations}
                        story={route.story} />
                </View>
            );
        }
    },
    getInitialState: function() {
        return {
            splashed: false,
        };
    },
    onActionSelected: function(position) {
    },
    render: function() {
       // if (this.state.splashed) {
            var initialRoute = {name: 'home'};
            return (
                <Navigator
                    style={styles.container}
                    initialRoute={initialRoute}
                    configureScene={() => Navigator.SceneConfigs.FadeAndroid}
                    //configureScene={() => Navigator.SceneConfigs.FloatFromRight}
                    renderScene={this.RouteMapper}
                    />
            );
        //}
        //else {
        //    return (
        //        <SplashScreen />
        //    );
        //}
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});



AppRegistry.registerComponent('dianhua', () => dianhua);
