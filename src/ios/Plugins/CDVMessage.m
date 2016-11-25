/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at
 
 http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

#include <sys/types.h>
#include <sys/sysctl.h>

#import <Cordova/CDV.h>
#import "CDVMessage.h"
#import "RongIMKit/RongIMKit.h"
#import "AppDelegate.h"
#import "RongIMKit/RCIM.h"
#import <Cordova/CDVPlugin.h>

#define NAVI_BAR_HEIGHT 44.0f


@implementation CDVMessage
@synthesize userid, username,portraiturl,receiveData;


UINavigationController *nav;
- (void)login:(CDVInvokedUrlCommand*)command
{
     //  CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"1"];
    //
    NSArray* arguments = command.arguments;
    // arguments
    userid = [arguments objectAtIndex:0];
    username = [arguments objectAtIndex:1];
    portraiturl = [arguments objectAtIndex:2];

    NSLog(@"------%@--",userid);
    NSString *str = [[NSString alloc] initWithString:[NSString stringWithFormat:@"?appkey=%@&appsecret=%@&userid=%@&portraituri=%@&username=%@" ,[AppDelegate RyAppKey],
          [AppDelegate RySecret],self.userid,self.portraiturl,[self.username stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]]];
    
  

        NSString * urlStr =[[AppDelegate RyServer] stringByAppendingString:str];
        NSURL *url = [NSURL URLWithString:urlStr];

        NSMutableURLRequest *request = [[NSMutableURLRequest alloc]initWithURL:url cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:15];
        NSOperationQueue *queue=[NSOperationQueue mainQueue];
    
        [NSURLConnection sendAsynchronousRequest:request queue:queue completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
    
            NSString * RyToken = [[NSString alloc]initWithData:data encoding:NSUTF8StringEncoding];
      
	
//             //连接融云服务器。
//            [[RCIM sharedRCIM] connectWithToken:RyToken completion:^(NSString *userId) {
//                 //此处处理连接成功。
//                NSLog(@"Login successfully with userId: %@.", userId);
//            } error:^(RCConnectErrorCode status) {
  //                NSLog(@"Login failed.");
//         }];
            
            [[RCIM sharedRCIM] connectWithToken:RyToken success:^(NSString *userId) {
                NSLog(@"登陆成功。当前登录的用户ID：%@", userId);
                RCUserInfo *userInfo = [[RCUserInfo alloc]init];
                userInfo.userId = userId;
                userInfo.name = username;
                userInfo.portraitUri = portraiturl;
                
                [RCIMClient sharedRCIMClient].currentUserInfo =userInfo;
                
//                [RCIMClient setOnReceiveUnreadCountChangedListener]
                //todo set current userinfo
                //set 设置未读消息数
                
                
            } error:^(RCConnectErrorCode status) {
                NSLog(@"登陆的错误码为:%d", status);
                
            } tokenIncorrect:^{
                //token过期或者不正确。
                  //如果没有设置token有效期却提示token错误，请检查您客户端和服务器的appkey是否匹配，还有检查您获取token的流程。
                NSLog(@"token错误");
            }];
            
    
  }];
   
}
-(void)openMessageList:(CDVInvokedUrlCommand *)command
{
    ChatListViewController *chatList = [[ChatListViewController alloc] init];
    
    [self.viewController.navigationController pushViewController:chatList animated:YES];
   // [self.viewController.navigationController  pushViewController:chatListViewController animated:YES ];
   [self.viewController.navigationController  setNavigationBarHidden:NO animated:YES];
//    [self setFriends:command];
//    
}
-(void)unReadRongMsg:(CDVInvokedUrlCommand *)command
{
    
     //CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"1"];

    
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:[[RCIMClient sharedRCIMClient] getTotalUnreadCount]];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    
}


- (void)singlechat:(CDVInvokedUrlCommand*)command
{
    NSArray* arguments = command.arguments;
    //新建一个聊天会话View Controller对象
    RCConversationViewController *chat = [[RCConversationViewController alloc]init];
    
    //设置会话的类型，如单聊、讨论组、群聊、聊天室、客服、公众服务会话等
    chat.conversationType = ConversationType_PRIVATE;
    //设置会话的目标会话ID。（单聊、客服、公众服务会话为对方的ID，讨论组、群聊、聊天室为会话的ID）
    chat.targetId = [arguments objectAtIndex:0];
    //设置聊天会话界面要显示的标题
    chat.title = [arguments objectAtIndex:1];
    
    //显示聊天会话界面
   //
    [self.viewController.navigationController pushViewController:chat animated:YES];
    [self.viewController.navigationController setNavigationBarHidden:NO animated:YES];
}

- (void)closeMessage:(CDVInvokedUrlCommand*)command
{
    [[RCIM sharedRCIM] disconnect:NO];
}




@end

