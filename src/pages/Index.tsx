import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("messages");
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "dima",
      password: "38674128dima",
      role: "owner",
      description: "Создатель FamilyChat. Люблю технологии и семейное общение.",
      avatar: "D",
      blockedUsers: [],
      isOnline: true,
    },
    {
      id: 2,
      username: "alex",
      password: "123",
      role: "admin",
      description: "Модератор сообщества",
      avatar: "A",
      blockedUsers: [],
      isOnline: true,
    },
    {
      id: 3,
      username: "maria",
      password: "123",
      role: "user",
      description: "Активный пользователь",
      avatar: "M",
      blockedUsers: [],
      isOnline: false,
    },
  ]);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    description: "",
  });
  const [messageText, setMessageText] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);
  const [callType, setCallType] = useState("");
  const [blockDialogUser, setBlockDialogUser] = useState(null);
  const [unblockRequestUser, setUnblockRequestUser] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "video",
      channel: "Новости технологий",
      title: "Как создать мессенджер",
      time: "2 мин назад",
      read: false,
    },
    {
      id: 2,
      type: "unblock",
      from: "maria",
      text: "Просит разблокировать",
      time: "5 мин назад",
      read: false,
    },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "alex",
      text: "Привет! Как дела?",
      time: "14:30",
      isOwn: false,
    },
    {
      id: 2,
      sender: "dima",
      text: "Всё отлично! А у тебя?",
      time: "14:32",
      isOwn: true,
    },
    {
      id: 3,
      sender: "alex",
      text: "🔒 Это зашифрованное сообщение!",
      time: "14:35",
      isOwn: false,
      encrypted: true,
    },
  ]);

  const handleLogin = () => {
    const user = users.find(
      (u) =>
        u.username === loginForm.username && u.password === loginForm.password,
    );
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setProfileData({
        username: user.username,
        description: user.description,
      });
    } else {
      alert("Неверный логин или пароль");
    }
  };

  const handleRegister = () => {
    if (registerForm.password !== registerForm.confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    if (users.find((u) => u.username === registerForm.username)) {
      alert("Пользователь уже существует");
      return;
    }
    const newUser = {
      id: users.length + 1,
      username: registerForm.username,
      password: registerForm.password,
      role: "user",
      description: "Новый пользователь FamilyChat",
      avatar: registerForm.username.charAt(0).toUpperCase(),
      blockedUsers: [],
      isOnline: true,
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    setProfileData({
      username: newUser.username,
      description: newUser.description,
    });
  };

  const handleSendMessage = () => {
    const targetUserId = 2; // Alex's ID for demo
    if (!canSendMessage(targetUserId)) {
      alert("Вы не можете отправить сообщение этому пользователю");
      return;
    }
    if (messageText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: currentUser.username,
        text: messageText,
        time: new Date().toLocaleTimeString().slice(0, 5),
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
      setMessageText("");
    }
  };

  const handleCall = (type) => {
    const targetUserId = 2; // Alex's ID for demo

    if (isUserBlocked(targetUserId)) {
      // If user is blocked, show unblock request dialog
      setUnblockRequestUser(targetUserId);
      return;
    }

    if (!canCall(targetUserId)) {
      alert("Вы не можете звонить этому пользователю");
      return;
    }

    setCallType(type);
    setIsCallActive(true);
    setTimeout(() => setIsCallActive(false), 3000);
  };

  const handleUpdateProfile = () => {
    const updatedUser = {
      ...currentUser,
      username: profileData.username,
      description: profileData.description,
    };
    setCurrentUser(updatedUser);
    setUsers(users.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    setEditProfile(false);
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
  };

  const handleBlockUser = (userId) => {
    const updatedUser = {
      ...currentUser,
      blockedUsers: [...(currentUser.blockedUsers || []), userId],
    };
    setCurrentUser(updatedUser);
    setUsers(users.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    setBlockDialogUser(null);
  };

  const handleUnblockUser = (userId) => {
    const updatedUser = {
      ...currentUser,
      blockedUsers: (currentUser.blockedUsers || []).filter(
        (id) => id !== userId,
      ),
    };
    setCurrentUser(updatedUser);
    setUsers(users.map((u) => (u.id === currentUser.id ? updatedUser : u)));
  };

  const isUserBlocked = (userId) => {
    return currentUser?.blockedUsers?.includes(userId) || false;
  };

  const isBlockedByUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user?.blockedUsers?.includes(currentUser?.id) || false;
  };

  const canSendMessage = (userId) => {
    return !isUserBlocked(userId) && !isBlockedByUser(userId);
  };

  const canCall = (userId) => {
    return !isBlockedByUser(userId);
  };

  const handleUnblockRequest = (fromUserId) => {
    if (isUserBlocked(fromUserId)) {
      alert(
        "Пользователь просит разблокировать. Вы можете разблокировать его в настройках.",
      );
    }
    setUnblockRequestUser(null);
  };

  const markNotificationRead = (notificationId) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n,
      ),
    );
  };

  const getUnreadNotificationsCount = () => {
    return notifications.filter((n) => !n.read).length;
  };

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

  // Auth Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md animate-fade-in">
          <CardHeader className="text-center">
            <div className="w-20 h-20 gradient-coral-teal rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Heart" size={40} className="text-white" />
            </div>
            <CardTitle className="text-2xl font-heading">FamilyChat</CardTitle>
            <p className="text-gray-600 font-body">
              Семейный мессенджер для близких
            </p>
          </CardHeader>
          <CardContent>
            <Tabs
              value={authMode}
              onValueChange={setAuthMode}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="login-username">Имя пользователя</Label>
                  <Input
                    id="login-username"
                    placeholder="Введите имя пользователя"
                    value={loginForm.username}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, username: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Пароль</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Введите пароль"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                  />
                </div>
                <Button
                  onClick={handleLogin}
                  className="w-full gradient-coral-teal text-white"
                >
                  Войти
                </Button>
                <div className="text-center text-sm text-gray-600">
                  Тестовые аккаунты: dima/38674128dima, alex/123, maria/123
                </div>
              </TabsContent>

              <TabsContent value="register" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="register-username">Имя пользователя</Label>
                  <Input
                    id="register-username"
                    placeholder="Выберите имя пользователя"
                    value={registerForm.username}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Пароль</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Создайте пароль"
                    value={registerForm.password}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-confirm">Подтвердите пароль</Label>
                  <Input
                    id="register-confirm"
                    type="password"
                    placeholder="Повторите пароль"
                    value={registerForm.confirmPassword}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <Button
                  onClick={handleRegister}
                  className="w-full gradient-blue-purple text-white"
                >
                  Зарегистрироваться
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Call Overlay */}
      {isCallActive && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <Card className="p-8 text-center">
            <div className="w-24 h-24 gradient-coral-teal rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Icon
                name={callType === "video" ? "Video" : "Phone"}
                size={40}
                className="text-white"
              />
            </div>
            <h3 className="text-xl font-heading mb-2">
              {callType === "video" ? "Видео звонок" : "Аудио звонок"}
            </h3>
            <p className="text-gray-600 mb-4">Соединение с Алексей...</p>
            <Button
              onClick={() => setIsCallActive(false)}
              variant="destructive"
            >
              <Icon name="PhoneOff" size={16} className="mr-2" />
              Завершить
            </Button>
          </Card>
        </div>
      )}

      {/* Header */}
      <header className="gradient-coral-teal p-4 text-white shadow-lg">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-blue-purple rounded-xl flex items-center justify-center">
              <Icon name="Heart" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-heading">FamilyChat</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Icon name="Search" size={18} />
            </Button>
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Icon name="Bell" size={18} />
                {getUnreadNotificationsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getUnreadNotificationsCount()}
                  </span>
                )}
              </Button>
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                  <div className="p-4 border-b">
                    <h3 className="font-heading text-gray-900">Уведомления</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${!notification.read ? "bg-blue-50" : ""}`}
                        onClick={() => markNotificationRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <Icon
                              name={
                                notification.type === "video"
                                  ? "PlayCircle"
                                  : "MessageCircle"
                              }
                              size={16}
                              className="text-white"
                            />
                          </div>
                          <div className="flex-1">
                            {notification.type === "video" ? (
                              <div>
                                <p className="text-sm font-body text-gray-900">
                                  📺 Новое видео в канале "
                                  {notification.channel}"
                                </p>
                                <p className="text-sm font-body text-gray-600">
                                  {notification.title}
                                </p>
                                <span className="text-xs text-gray-500">
                                  {notification.time}
                                </span>
                              </div>
                            ) : (
                              <div>
                                <p className="text-sm font-body text-gray-900">
                                  🔓 {notification.from} {notification.text}
                                </p>
                                <span className="text-xs text-gray-500">
                                  {notification.time}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Icon name="Settings" size={18} />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-white text-coral-500">
                {currentUser?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {currentUser?.role === "owner" && (
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse">
                👑 ВЛАДЕЛЕЦ
              </Badge>
            )}
            {currentUser?.role === "admin" && (
              <Badge className="bg-yellow-400 text-black animate-pulse">
                ⭐ АДМИН
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => {
                setIsAuthenticated(false);
                setCurrentUser(null);
              }}
            >
              <Icon name="LogOut" size={18} />
            </Button>
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="gradient-coral-teal text-white"
                          >
                            <Icon name="Plus" size={16} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Новый чат</DialogTitle>
                            <DialogDescription>
                              Начните новый разговор с семьей или друзьями
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Input placeholder="Имя пользователя" />
                            <Button className="w-full gradient-coral-teal text-white">
                              Создать чат
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
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
                              <Badge className="bg-red-500 text-white text-xs">
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
                        <AvatarFallback className="bg-white text-coral-500">
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
                          onClick={() => handleCall("audio")}
                        >
                          <Icon name="Phone" size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                          onClick={() => handleCall("video")}
                        >
                          <Icon name="Video" size={16} />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-white hover:bg-white/20"
                            >
                              <Icon name="MoreVertical" size={16} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Управление пользователем
                              </DialogTitle>
                              <DialogDescription>
                                Дополнительные действия с Алексей
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              {isUserBlocked(2) ? (
                                <Button
                                  onClick={() => handleUnblockUser(2)}
                                  className="w-full gradient-blue-purple text-white"
                                >
                                  <Icon
                                    name="UserCheck"
                                    size={16}
                                    className="mr-2"
                                  />
                                  Разблокировать пользователя
                                </Button>
                              ) : (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="destructive"
                                      className="w-full"
                                    >
                                      <Icon
                                        name="UserX"
                                        size={16}
                                        className="mr-2"
                                      />
                                      Заблокировать пользователя
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Заблокировать пользователя?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Вы не сможете получать сообщения от
                                        этого пользователя, и он не сможет вам
                                        писать. Звонки будут ограничены.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Отмена
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleBlockUser(2)}
                                      >
                                        Заблокировать
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                              <Button variant="outline" className="w-full">
                                <Icon name="Flag" size={16} className="mr-2" />
                                Пожаловаться
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isOwn ? "justify-end" : ""}`}
                        >
                          <div
                            className={`rounded-lg p-3 max-w-xs ${
                              message.isOwn
                                ? "gradient-coral-teal text-white"
                                : message.encrypted
                                  ? "glass-effect border border-yellow-300"
                                  : "bg-gray-100"
                            }`}
                          >
                            {message.encrypted && (
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
                            )}
                            <p className="font-body">{message.text}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span
                                className={`text-xs ${message.isOwn ? "opacity-90" : "text-gray-500"}`}
                              >
                                {message.time}
                              </span>
                              {message.isOwn && (
                                <Icon
                                  name="Check"
                                  size={14}
                                  className="opacity-90"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <div className="border-t p-4">
                    {!canSendMessage(2) ? (
                      <div className="text-center py-4">
                        <Icon
                          name="UserX"
                          size={32}
                          className="mx-auto text-gray-400 mb-2"
                        />
                        <p className="text-gray-600 font-body text-sm">
                          {isUserBlocked(2)
                            ? "Вы заблокировали этого пользователя"
                            : "Этот пользователь заблокировал вас"}
                        </p>
                        {isUserBlocked(2) && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-2"
                            onClick={() => handleUnblockUser(2)}
                          >
                            Разблокировать
                          </Button>
                        )}
                      </div>
                    ) : (
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
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleSendMessage()
                          }
                        />
                        <Button
                          className="gradient-coral-teal text-white"
                          onClick={handleSendMessage}
                        >
                          <Icon name="Send" size={16} />
                        </Button>
                      </div>
                    )}
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
                          onClick={() => {
                            const newNotification = {
                              id: notifications.length + 1,
                              type: "video",
                              channel: channel.name,
                              title: "Добро пожаловать в канал!",
                              time: "только что",
                              read: false,
                            };
                            setNotifications([
                              newNotification,
                              ...notifications,
                            ]);
                            alert(
                              `Подписка на канал "${channel.name}" оформлена! 🔔`,
                            );
                          }}
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gradient-coral-teal text-white">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Создать видео
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Создать видео</DialogTitle>
                      <DialogDescription>
                        Поделитесь видео с семьей и друзьями
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input placeholder="Название видео" />
                      <Textarea placeholder="Описание видео" />
                      <Button
                        className="w-full gradient-coral-teal text-white"
                        onClick={() => {
                          const newNotification = {
                            id: notifications.length + 1,
                            type: "video",
                            channel: "Мой канал",
                            title: "Новое видео загружено!",
                            time: "только что",
                            read: false,
                          };
                          setNotifications([newNotification, ...notifications]);
                          alert(
                            "Видео загружено! Подписчики получили уведомление 📹",
                          );
                        }}
                      >
                        Загрузить видео
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
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
                          <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center text-6xl">
                            {video.thumbnail}
                          </div>
                          {video.type === "live" && (
                            <Badge className="absolute top-2 left-2 bg-red-500 text-white animate-pulse">
                              🔴 LIVE
                            </Badge>
                          )}
                          {video.type === "short" && (
                            <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
                              ⚡ SHORT
                            </Badge>
                          )}
                          <Button
                            size="sm"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() =>
                              alert(`Воспроизведение: ${video.title}`)
                            }
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
                          {(currentUser?.role === "admin" ||
                            currentUser?.role === "owner") && (
                            <div className="flex space-x-2 mt-3">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs"
                              >
                                <Icon name="Star" size={12} className="mr-1" />
                                ⭐
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    className="text-xs"
                                  >
                                    <Icon name="Trash2" size={12} />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Удалить видео?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Это действие нельзя отменить. Видео будет
                                      удалено навсегда.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Отмена
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                      Удалить
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
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
                    Начните видео или аудио звонок с семьей
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button
                      className="gradient-coral-teal text-white"
                      onClick={() => handleCall("audio")}
                    >
                      <Icon name="Phone" size={16} className="mr-2" />
                      Аудио звонок
                    </Button>
                    <Button
                      className="gradient-blue-purple text-white"
                      onClick={() => handleCall("video")}
                    >
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
                      {currentUser?.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-heading mb-2">
                    {currentUser?.username}
                  </h2>
                  {currentUser?.role === "owner" && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-4">
                      👑 ВЛАДЕЛЕЦ СЕРВИСА
                    </Badge>
                  )}
                  {currentUser?.role === "admin" && (
                    <Badge className="bg-yellow-400 text-black mb-4">
                      ⭐ АДМИНИСТРАТОР
                    </Badge>
                  )}
                  <p className="text-gray-600 font-body mb-4">
                    {currentUser?.description}
                  </p>
                  <Button
                    className="w-full gradient-coral-teal text-white"
                    onClick={() => {
                      setProfileData({
                        username: currentUser.username,
                        description: currentUser.description,
                      });
                      setEditProfile(true);
                    }}
                  >
                    Редактировать профиль
                  </Button>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 animate-fade-in">
                <CardHeader>
                  <CardTitle className="font-heading">
                    {currentUser?.role === "owner"
                      ? "Управление сервисом"
                      : "Настройки безопасности"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentUser?.role === "owner" && (
                    <div className="space-y-4 mb-6">
                      <h4 className="font-heading text-lg">
                        Управление пользователями
                      </h4>
                      {users
                        .filter((u) => u.id !== currentUser.id)
                        .map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarFallback>
                                  {user.username.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h5 className="font-heading">
                                  {user.username}
                                </h5>
                                <p className="text-sm text-gray-600">
                                  {user.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={
                                  user.role === "admin"
                                    ? "bg-yellow-400 text-black"
                                    : "bg-gray-400 text-white"
                                }
                              >
                                {user.role === "admin"
                                  ? "⭐ Админ"
                                  : "👤 Пользователь"}
                              </Badge>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleRoleChange(
                                    user.id,
                                    user.role === "admin" ? "user" : "admin",
                                  )
                                }
                              >
                                {user.role === "admin"
                                  ? "Убрать админа"
                                  : "Сделать админом"}
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

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

      {/* Edit Profile Dialog */}
      <Dialog open={editProfile} onOpenChange={setEditProfile}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать профиль</DialogTitle>
            <DialogDescription>Измените информацию о себе</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-username">Имя пользователя</Label>
              <Input
                id="edit-username"
                value={profileData.username}
                onChange={(e) =>
                  setProfileData({ ...profileData, username: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Описание</Label>
              <Textarea
                id="edit-description"
                value={profileData.description}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    description: e.target.value,
                  })
                }
                placeholder="Расскажите о себе..."
              />
            </div>
            <Button
              onClick={handleUpdateProfile}
              className="w-full gradient-coral-teal text-white"
            >
              Сохранить изменения
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Unblock Request Dialog */}
      <AlertDialog
        open={!!unblockRequestUser}
        onOpenChange={() => setUnblockRequestUser(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Запрос на разблокировку</AlertDialogTitle>
            <AlertDialogDescription>
              Вы заблокировали этого пользователя. Хотите отправить звонок с
              просьбой о разблокировке? Этот звонок будет содержать сообщение
              "Разблокируй меня, пожалуйста".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                alert("Запрос на разблокировку отправлен! 📞");
                setUnblockRequestUser(null);
              }}
            >
              Отправить запрос
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
