import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Target, TrendingDown, Apple, Activity, AlertCircle, Camera, MessageCircle } from 'lucide-react';

const CalorieTrackerDashboard = () => {
  const [currentWeight, setCurrentWeight] = useState(63);
  const [targetWeight, setTargetWeight] = useState(60);
  const [targetDays, setTargetDays] = useState(30);
  const [todayCalories, setTodayCalories] = useState(1330);
  const [meals, setMeals] = useState([
    { id: 1, time: '朝食', name: '梅おにぎり', calories: 180, carbs: 38, protein: 4, fat: 0.5, fiber: 1, vegetables: 0 },
    { id: 2, time: '昼食', name: 'カルボナーラ', calories: 600, carbs: 60, protein: 20, fat: 30, fiber: 2, vegetables: 50 },
    { id: 3, time: '昼食', name: 'おにぎり', calories: 250, carbs: 40, protein: 10, fat: 5, fiber: 1, vegetables: 0 },
    { id: 4, time: '夕食', name: 'ラーメン', calories: 700, carbs: 80, protein: 40, fat: 25, fiber: 5, vegetables: 50 }
  ]);

  // 基礎代謝率の計算（簡易版）
  const bmr = currentWeight * 24; // 簡易計算
  const tdee = bmr * 1.3; // 軽い活動レベル
  
  // 目標達成に必要な日次カロリー
  const weightDifference = currentWeight - targetWeight;
  const totalCalorieDeficit = weightDifference * 7700; // 1kg = 7700kcal
  const dailyCalorieDeficit = totalCalorieDeficit / targetDays;
  const targetDailyCalories = Math.round(tdee - dailyCalorieDeficit);

  // 栄養素の合計計算
  const totalNutrients = meals.reduce((acc, meal) => ({
    calories: acc.calories + meal.calories,
    carbs: acc.carbs + meal.carbs,
    protein: acc.protein + meal.protein,
    fat: acc.fat + meal.fat,
    fiber: acc.fiber + meal.fiber,
    vegetables: acc.vegetables + meal.vegetables
  }), { calories: 0, carbs: 0, protein: 0, fat: 0, fiber: 0, vegetables: 0 });

  // 栄養バランスのデータ
  const nutritionData = [
    { name: '炭水化物', value: totalNutrients.carbs, color: '#3B82F6' },
    { name: 'タンパク質', value: totalNutrients.protein, color: '#10B981' },
    { name: '脂質', value: totalNutrients.fat, color: '#F59E0B' }
  ];

  // 週間データ（サンプル）
  const weeklyData = [
    { day: '月', calories: 1450, weight: 63.2 },
    { day: '火', calories: 1380, weight: 63.1 },
    { day: '水', calories: 1330, weight: 63.0 },
    { day: '木', calories: 1400, weight: 62.9 },
    { day: '金', calories: 1350, weight: 62.8 },
    { day: '土', calories: 1500, weight: 62.9 },
    { day: '日', calories: 1420, weight: 62.8 }
  ];

  const calorieStatus = todayCalories <= targetDailyCalories ? 'good' : 'over';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Apple className="text-green-500" size={36} />
              カロリートラッカー
            </h1>
            <div className="flex items-center gap-2 text-gray-600">
              <MessageCircle size={20} />
              <span className="text-sm">LINE連携中</span>
            </div>
          </div>
          
          {/* 目標設定 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-xl">
              <label className="text-sm text-gray-700 block mb-2">現在の体重</label>
              <input
                type="number"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-white/80 backdrop-blur"
              />
            </div>
            <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-xl">
              <label className="text-sm text-gray-700 block mb-2">目標体重</label>
              <input
                type="number"
                value={targetWeight}
                onChange={(e) => setTargetWeight(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-white/80 backdrop-blur"
              />
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-xl">
              <label className="text-sm text-gray-700 block mb-2">目標日数</label>
              <input
                type="number"
                value={targetDays}
                onChange={(e) => setTargetDays(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-white/80 backdrop-blur"
              />
            </div>
          </div>
        </div>

        {/* カロリー概要 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">今日の摂取カロリー</h3>
              <Calendar className="text-blue-500" size={24} />
            </div>
            <p className={`text-3xl font-bold ${calorieStatus === 'good' ? 'text-green-600' : 'text-red-600'}`}>
              {todayCalories} kcal
            </p>
            <p className="text-sm text-gray-500 mt-2">
              目標: {targetDailyCalories} kcal
            </p>
            <div className="mt-4 bg-gray-200 rounded-full h-3">
              <div 
                className={`h-full rounded-full ${calorieStatus === 'good' ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min((todayCalories / targetDailyCalories) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">基礎代謝</h3>
              <Activity className="text-orange-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-800">{bmr} kcal</p>
            <p className="text-sm text-gray-500 mt-2">
              活動代謝: {tdee} kcal
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">減量ペース</h3>
              <TrendingDown className="text-purple-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-purple-600">
              {(weightDifference / targetDays * 1000).toFixed(0)}g/日
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {weightDifference}kg / {targetDays}日
            </p>
          </div>
        </div>

        {/* 今日の食事記録 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Camera size={24} className="text-indigo-500" />
            今日の食事記録
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600 border-b">
                  <th className="pb-2">時間帯</th>
                  <th className="pb-2">食事名</th>
                  <th className="pb-2">カロリー</th>
                  <th className="pb-2">糖質</th>
                  <th className="pb-2">タンパク質</th>
                  <th className="pb-2">脂質</th>
                  <th className="pb-2">野菜</th>
                </tr>
              </thead>
              <tbody>
                {meals.map((meal) => (
                  <tr key={meal.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{meal.time}</td>
                    <td className="py-3 font-medium">{meal.name}</td>
                    <td className="py-3">{meal.calories} kcal</td>
                    <td className="py-3">{meal.carbs}g</td>
                    <td className="py-3">{meal.protein}g</td>
                    <td className="py-3">{meal.fat}g</td>
                    <td className="py-3">{meal.vegetables}g</td>
                  </tr>
                ))}
                <tr className="font-bold text-gray-800">
                  <td className="pt-4">合計</td>
                  <td className="pt-4">-</td>
                  <td className="pt-4">{totalNutrients.calories} kcal</td>
                  <td className="pt-4">{totalNutrients.carbs}g</td>
                  <td className="pt-4">{totalNutrients.protein}g</td>
                  <td className="pt-4">{totalNutrients.fat}g</td>
                  <td className="pt-4">{totalNutrients.vegetables}g</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* グラフ表示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* 栄養バランス */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">栄養バランス</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={nutritionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}g`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {nutritionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 週間推移 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">週間カロリー推移</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="カロリー (kcal)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* アドバイス */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-start gap-4">
            <AlertCircle size={32} className="flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">今日のアドバイス</h3>
              {calorieStatus === 'good' ? (
                <div>
                  <p className="mb-2">素晴らしい！目標カロリー内に収まっています。</p>
                  <p>野菜摂取量: {totalNutrients.vegetables}g - もう少し野菜を増やすとさらに良いでしょう。</p>
                  <p>食物繊維: {totalNutrients.fiber}g - 目標の25gまであと{25 - totalNutrients.fiber}gです。</p>
                </div>
              ) : (
                <div>
                  <p className="mb-2">今日のカロリーが目標を{todayCalories - targetDailyCalories}kcal超過しています。</p>
                  <p>夕食を軽めにするか、運動を追加することをおすすめします。</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LINE連携案内 */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <MessageCircle className="text-green-500" size={24} />
            LINEボット連携方法
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-800 mb-2">📸 写真を送信</p>
              <p>食事の写真をLINEで送ると、AIが自動で食品を認識してカロリーを計算します。</p>
            </div>
            <div>
              <p className="font-medium text-gray-800 mb-2">💬 テキストで入力</p>
              <p>「カルボナーラ」など食事名を送信すると、データベースから栄養情報を取得します。</p>
            </div>
            <div>
              <p className="font-medium text-gray-800 mb-2">⚖️ 体重記録</p>
              <p>「体重 63kg」と送信すると、体重の推移を記録できます。</p>
            </div>
            <div>
              <p className="font-medium text-gray-800 mb-2">📊 レポート確認</p>
              <p>「今日のまとめ」と送信すると、その日の摂取カロリーと栄養バランスを確認できます。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieTrackerDashboard;