#!/usr/bin/env node
var rootdir = process.argv[2];
//     shell = require("shelljs"),
//     path = require("path"),
//     replace = require(path.join(rootdir, "hooks", "replace-text")),
//     currentProject = require(path.join(rootdir, "huatech", "current-project")),
//     projectConfig = require(path.join(rootdir, "huatech", currentProject.name, "project-config")),
//     priProjectConfig=  require(path.join(rootdir, "huatech", currentProject.lastPrepare, "project-config")),
//     plugins = projectConfig.plugins,
//     manifestFile = path.join(rootdir, "platforms/android/AndroidManifest.xml");

function setRongCloud() {
    //注册插件信息
    var imkitManifestFile = path.join(rootdir,"platforms/android/IMKIT/src/main/AndroidManifest.xml")
    var configXmlFile = path.join(rootdir, "platforms/android/res/xml/config.xml");
    var appendContent = path.join(rootdir, "hooks/androidAppendConfigContent");
    var rongCloudFile1 = path.join(rootdir, "platforms/android/src/io/rong/fast/activity/ConversationActivity.java");
    var rongCloudFile2 = path.join(rootdir, "platforms/android/src/io/rong/fast/activity/ConversationListActivity.java");
    var rongCloudFile3 = path.join(rootdir, "platforms/android/src/io/rong/fast/activity/SubConversationListActivtiy.java");



    //RONG_CLOUD_APP_KEY APPSECRET
    replace.replace_string_in_file(configXmlFile, ".*ConfigXmlAppendPlaceHolder.*", shell.cat(appendContent));
    // TODO: 2016/9/9 改包名，改host，改APPKEY，所有融云相关的都要改
    replace.replace_string_in_file(imkitManifestFile, ".*RONG_CLOUD_APP_KEY.*", "<meta-data android:name=" + '"' + "RONG_CLOUD_APP_KEY" + '"' + " android:value=" + '"' + plugins.rongCloud.RONG_CLOUD_APP_KEY + '"'+"/>" );
    replace.replace_string_in_file(imkitManifestFile, ".*APPSECRET.*", "<meta-data android:name=" + '"' + "APPSECRET" + '"' + " android:value=" + '"' + plugins.rongCloud.APPSECRET + '"'+"/>" );
    //replace.replace_string_in_file(imkitManifestFile, "host=\".*\".*", "host="+'"'+projectConfig.packageName +'" ' );
    replace.replace_string_in_file(imkitManifestFile, priProjectConfig.packageName, projectConfig.packageName );

    replace.replace_string_in_file(manifestFile, ".*TOKEN_SERVER_URL.*", "<meta-data android:name=" + '"' + "TOKEN_SERVER_URL" + '"' + " android:value=" + '"' + plugins.rongCloud.TOKEN_SERVER_URL + '"'+"/>" );
    //replace.replace_string_in_file(manifestFile, "host=\".*\".*android:pathPrefix", "host="+'"'+projectConfig.packageName +'" '+" "+"android:pathPrefix" );
    replace.replace_string_in_file(manifestFile, priProjectConfig.packageName, projectConfig.packageName);


    // replace.replace_string_in_file(rongCloudFile1, ".*//line-package-name-to-be-replaced","import " +projectConfig.packageName+".R;//line-package-name-to-be-replaced");
    // replace.replace_string_in_file(rongCloudFile2, ".*//line-package-name-to-be-replaced","import " +projectConfig.packageName+".R;//line-package-name-to-be-replaced");
    // replace.replace_string_in_file(rongCloudFireplace.replace_string_in_file(rongCloudFile1, ".*//line-package-name-to-be-replaced","import " +projectConfig.packageName+".R;//line-package-name-to-be-replaced");
    replace.replace_string_in_file(rongCloudFile1, priProjectConfig.packageName, projectConfig.packageName);
    replace.replace_string_in_file(rongCloudFile2, priProjectConfig.packageName, projectConfig.packageName);
    replace.replace_string_in_file(rongCloudFile3, priProjectConfig.packageName, projectConfig.packageName);



}
function setMtjPlugin() {
    replace.replace_string_in_file(manifestFile, ".*BaiduMobAd_STAT_ID.*", "<meta-data android:name=" + '"' + "BaiduMobAd_STAT_ID" + '"' + " android:value=" + '"' + plugins.mtj.BaiduMobAd_STAT_ID + '"'+"/>" );
    replace.replace_string_in_file(manifestFile, ".*BaiduMobAd_CHANNEL.*", "<meta-data android:name=" + '"' + "BaiduMobAd_CHANNEL" + '"' + " android:value=" + '"' + plugins.mtj.BaiduMobAd_CHANNEL + '"'+"/>" );
}
function setJPushPlugin() {
    replace.replace_string_in_file(manifestFile, priProjectConfig.plugins.jPush.JPUSH_APPKEY,projectConfig.plugins.jPush.JPUSH_APPKEY);

}

function setAndroidPluginConfig()
{
    var pluginAndroidJsonFile =   path.join(rootdir, "plugins/android.json");
    var androidJsonFile =   path.join(rootdir, "platforms/android/android.json");

    replace.replace_string_in_file(pluginAndroidJsonFile, priProjectConfig.packageName, projectConfig.packageName);
    replace.replace_string_in_file(androidJsonFile, priProjectConfig.packageName, projectConfig.packageName);
}
function main() {
    // setAndroidPluginConfig();
    // setRongCloud();
    // setMtjPlugin();
    // setJPushPlugin();
    // var platforms = process.env.CORDOVA_PLATFORMS.split(',');
    console.log("rongImkit");
    console.log("rootdir value:" + rootdir);
}
main();
