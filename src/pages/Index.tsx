import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [activeTab, setActiveTab] = useState("messages");
  const [userRole, setUserRole] = useState("user"); // For demo: 'user' or 'admin'

  // Mock data
  const chats = [
    {
      id: 1,
      name: "Алексей",
      lastMessage: "Привет! Как дела?",
      time: "14:30",
      unread: 2,
      avatar: "A",
      isOnline: true,
    },
    {
      id: 2,
      name: "Команда проекта",
      lastMessage: "Новое обновление готово",
      time: "13:45",
      unread: 0,
      avatar: "К",
      isOnline: false,
    },
    {
      id: 3,
      name: "Мария",
      lastMessage: "🔒 Зашифрованное сообщение",
      time: "12:20",
      unread: 1,
      avatar: "М",
      isOnline: true,
    },
  ];

  const videos = [
    {
      id: 1,
      title: "Как создать мессенджер",
      duration: "15:30",
      views: "1.2К",
      thumbnail: "🎥",
      type: "long",
    },
    {
      id: 2,
      title: "Быстрый туториал",
      duration: "0:45",
      views: "5.8К",
      thumbnail: "⚡",
      type: "short",
    },
    {
      id: 3,
      title: "Live трансляция",
      duration: "LIVE",
      views: "234",
      thumbnail: "🔴",
      type: "live",
    },
  ];

  const channels = [
    { id: 1, name: "Новости технологий", subscribers: "45.2К", avatar: "Н" },
    { id: 2, name: "Разработка", subscribers: "12.8К", avatar: "Р" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="gradient-coral-teal p-4 text-white shadow-lg">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-blue-purple rounded-xl flex items-center justify-center animate-pulse-glow">
              <Icon name="MessageCircle" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-heading">SecureChat</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Icon name="Search" size={18} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Icon name="Settings" size={18} />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-white text-messenger-coral">
                dima
              </AvatarFallback>
            </Avatar>
            {userRole === "admin" && (
              <Badge className="bg-yellow-400 text-black animate-pulse">
                ⭐ АДМИН
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5 bg-transparent">
              <TabsTrigger
                value="messages"
                className="flex flex-col items-center space-y-1 py-3"
              >
                <Icon name="MessageSquare" size={20} />
                <span className="text-xs font-body">Сообщения</span>
              </TabsTrigger>
              <TabsTrigger
                value="channels"
                className="flex flex-col items-center space-y-1 py-3"
              >
                <Icon name="Users" size={20} />
                <span className="text-xs font-body">Каналы</span>
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="flex flex-col items-center space-y-1 py-3"
              >
                <Icon name="PlayCircle" size={20} />
                <span className="text-xs font-body">Видео</span>
              </TabsTrigger>
              <TabsTrigger
                value="calls"
                className="flex flex-col items-center space-y-1 py-3"
              >
                <Icon name="Phone" size={20} />
                <span className="text-xs font-body">Звонки</span>
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="flex flex-col items-center space-y-1 py-3"
              >
                <Icon name="User" size={20} />
                <span className="text-xs font-body">Профиль</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4">
        <Tabs value={activeTab} className="w-full">
          {/* Messages Tab */}
          <TabsContent value="messages" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chat List */}
              <div className="lg:col-span-1">
                <Card className="animate-fade-in">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between font-heading">
                      Чаты
                      <Button
                        size="sm"
                        className="gradient-coral-teal text-white"
                      >
                        <Icon name="Plus" size={16} />
                      </Button>
                    </CardTitle>
                    <Input placeholder="Поиск чатов..." className="font-body" />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {chats.map((chat) => (
                      <div
                        key={chat.id}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="gradient-blue-purple text-white">
                              {chat.avatar}
                            </AvatarFallback>
                          </Avatar>
                          {chat.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-heading text-sm truncate">
                              {chat.name}
                            </h4>
                            <span className="text-xs text-gray-500 font-body">
                              {chat.time}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 font-body truncate">
                              {chat.lastMessage}
                            </p>
                            {chat.unread > 0 && (
                              <Badge className="bg-messenger-coral text-white text-xs">
                                {chat.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Chat Window */}
              <div className="lg:col-span-2">
                <Card className="h-[600px] flex flex-col animate-fade-in">
                  <CardHeader className="gradient-coral-teal text-white">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-white text-messenger-coral">
                          А
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-heading">Алексей</h3>
                        <p className="text-sm opacity-90 font-body">Онлайн</p>
                      </div>
                      <div className="ml-auto flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                        >
                          <Icon name="Phone" size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                        >
                          <Icon name="Video" size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                        >
                          <Icon name="MoreVertical" size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex">
                        <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                          <p className="font-body">Привет! Как дела?</p>
                          <span className="text-xs text-gray-500">14:30</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="gradient-coral-teal text-white rounded-lg p-3 max-w-xs">
                          <p className="font-body">Всё отлично! А у тебя?</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs opacity-90">14:32</span>
                            <Icon
                              name="Check"
                              size={14}
                              className="opacity-90"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="glass-effect rounded-lg p-3 max-w-xs border border-yellow-300">
                          <div className="flex items-center space-x-2 mb-2">
                            <Icon
                              name="Lock"
                              size={16}
                              className="text-yellow-600"
                            />
                            <span className="text-sm font-body text-yellow-700">
                              Зашифровано E2E
                            </span>
                          </div>
                          <p className="font-body">
                            Это зашифрованное сообщение! 🔒
                          </p>
                          <span className="text-xs text-gray-500">14:35</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Icon name="Paperclip" size={16} />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Icon name="Image" size={16} />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Icon name="Mic" size={16} />
                      </Button>
                      <Input
                        placeholder="Введите сообщение..."
                        className="flex-1 font-body"
                      />
                      <Button className="gradient-coral-teal text-white">
                        <Icon name="Send" size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Channels Tab */}
          <TabsContent value="channels" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {channels.map((channel) => (
                <Card
                  key={channel.id}
                  className="animate-fade-in hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="gradient-blue-purple text-white text-xl">
                          {channel.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-heading text-lg">{channel.name}</h3>
                        <p className="text-gray-600 font-body">
                          {channel.subscribers} подписчиков
                        </p>
                        <Button
                          size="sm"
                          className="mt-2 gradient-coral-teal text-white"
                        >
                          Подписаться
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="mt-0">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-heading">Видео контент</h2>
                <Button className="gradient-coral-teal text-white">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать видео
                </Button>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all">Все</TabsTrigger>
                  <TabsTrigger value="shorts">Shorts</TabsTrigger>
                  <TabsTrigger value="long">Длинные</TabsTrigger>
                  <TabsTrigger value="live">Трансляции</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => (
                      <Card
                        key={video.id}
                        className="animate-fade-in hover:shadow-lg transition-shadow group"
                      >
                        <div className="relative">
                          <div className="aspect-video bg-gradient-to-br from-messenger-blue to-messenger-purple rounded-t-lg flex items-center justify-center text-6xl">
                            {video.thumbnail}
                          </div>
                          {video.type === "live" && (
                            <Badge className="absolute top-2 left-2 bg-red-500 text-white animate-pulse">
                              🔴 LIVE
                            </Badge>
                          )}
                          {video.type === "short" && (
                            <Badge className="absolute top-2 left-2 bg-messenger-orange text-white">
                              ⚡ SHORT
                            </Badge>
                          )}
                          <Button
                            size="sm"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Icon name="Play" size={16} />
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-heading text-sm font-semibold mb-2">
                            {video.title}
                          </h3>
                          <div className="flex justify-between text-sm text-gray-600 font-body">
                            <span>{video.views} просмотров</span>
                            <span>{video.duration}</span>
                          </div>
                          {userRole === "admin" && (
                            <div className="flex space-x-2 mt-3">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs"
                              >
                                <Icon name="Star" size={12} className="mr-1" />
                                ⭐
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="text-xs"
                              >
                                <Icon name="Trash2" size={12} />
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          {/* Calls Tab */}
          <TabsContent value="calls" className="mt-0">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="font-heading">Звонки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Icon
                    name="Phone"
                    size={64}
                    className="mx-auto text-gray-400 mb-4"
                  />
                  <h3 className="text-lg font-heading mb-2">
                    Нет активных звонков
                  </h3>
                  <p className="text-gray-600 font-body mb-4">
                    Начните видео или аудио звонок с друзьями
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button className="gradient-coral-teal text-white">
                      <Icon name="Phone" size={16} className="mr-2" />
                      Аудио звонок
                    </Button>
                    <Button className="gradient-blue-purple text-white">
                      <Icon name="Video" size={16} className="mr-2" />
                      Видео звонок
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="animate-fade-in">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarFallback className="gradient-coral-teal text-white text-2xl">
                      dima
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-heading mb-2">dima</h2>
                  {userRole === "admin" && (
                    <Badge className="bg-yellow-400 text-black mb-4">
                      ⭐ СУПЕР АДМИН ⭐
                    </Badge>
                  )}
                  <p className="text-gray-600 font-body mb-4">Статус: В сети</p>
                  <Button className="w-full gradient-coral-teal text-white">
                    Редактировать профиль
                  </Button>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 animate-fade-in">
                <CardHeader>
                  <CardTitle className="font-heading">
                    Настройки безопасности
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon
                        name="Shield"
                        size={24}
                        className="text-green-600"
                      />
                      <div>
                        <h4 className="font-heading text-sm">
                          End-to-End шифрование
                        </h4>
                        <p className="text-sm text-gray-600 font-body">
                          Ваши сообщения защищены
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-500 text-white">Активно</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="Key" size={24} className="text-blue-600" />
                      <div>
                        <h4 className="font-heading text-sm">
                          Двухфакторная аутентификация
                        </h4>
                        <p className="text-sm text-gray-600 font-body">
                          Дополнительная защита аккаунта
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Настроить
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon
                        name="Fingerprint"
                        size={24}
                        className="text-purple-600"
                      />
                      <div>
                        <h4 className="font-heading text-sm">
                          Биометрическая блокировка
                        </h4>
                        <p className="text-sm text-gray-600 font-body">
                          Отпечаток пальца или Face ID
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Включить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Demo Controls */}
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-body">Роль:</span>
              <Button
                size="sm"
                variant={userRole === "user" ? "default" : "outline"}
                onClick={() => setUserRole("user")}
              >
                Пользователь
              </Button>
              <Button
                size="sm"
                variant={userRole === "admin" ? "default" : "outline"}
                onClick={() => setUserRole("admin")}
                className="bg-yellow-400 text-black hover:bg-yellow-500"
              >
                Админ dima
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
