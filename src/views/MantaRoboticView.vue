<script setup>
import { ref, onMounted } from 'vue'
import NavBar from '../components/NavBar.vue'

const msgBar = ref('就绪')
const badgeText = ref('蓝牙未连接')
const isConnected = ref(false)
const badgeStyle = ref({ background: '#f1f5f9', color: '#64748b' })
const bleBtnText = ref('连接蓝牙设备')
const rgbPicker = ref('#4361ee')
const valR = ref(0)
const valG = ref(0)
const valB = ref(0)
const speedVal = ref(20)

let bleCharacteristic = null

const SERVICE_UUID = 0x1212
const CHAR_UUID = 0x3434

const connectBle = async () => {
    try {
        msgBar.value = '正在请求蓝牙权限...'
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ name: 'ESP32S3-Motor-Control' }],
            optionalServices: [SERVICE_UUID]
        })

        msgBar.value = '正在连接设备...'
        const server = await device.gatt.connect()

        msgBar.value = '正在寻找服务...'
        const service = await server.getPrimaryService(SERVICE_UUID)

        msgBar.value = '正在连接控制链路...'
        bleCharacteristic = await service.getCharacteristic(CHAR_UUID)

        isConnected.value = true
        badgeText.value = '已通过蓝牙连接'
        badgeStyle.value = { background: '#dcfce7', color: '#166534' }
        msgBar.value = '连接成功！'
        bleBtnText.value = '已连接'

        device.addEventListener('gattserverdisconnected', () => {
            badgeText.value = '蓝牙已断开'
            badgeStyle.value = { background: '#fee2e2', color: '#991b1b' }
            isConnected.value = false
            bleBtnText.value = '重新连接蓝牙'
            bleCharacteristic = null
        })

    } catch (err) {
        console.error(err)
        msgBar.value = '连接失败: ' + err.message
    }
}

const sendBleCommand = async (cmd) => {
    if (!bleCharacteristic) {
        msgBar.value = '请先连接蓝牙！'
        return false
    }
    try {
        const encoder = new TextEncoder()
        await bleCharacteristic.writeValue(encoder.encode(cmd))
        return true
    } catch (err) {
        msgBar.value = '发送失败: ' + err.message
        return false
    }
}

const syncRgb = async () => {
    const hex = rgbPicker.value.substring(1)
    msgBar.value = '正在通过蓝牙同步...'
    if (await sendBleCommand(`rgb${hex}`)) {
        msgBar.value = `同步成功! (#${hex.toUpperCase()})`
    }
}

const updateRgbValues = () => {
    const hex = rgbPicker.value.substring(1)
    valR.value = parseInt(hex.substring(0, 2), 16)
    valG.value = parseInt(hex.substring(2, 4), 16)
    valB.value = parseInt(hex.substring(4, 6), 16)
}

const updateSpeed = async () => {
    sendBleCommand(`spd${speedVal.value}`)
}

const motorAction = async (id, dir) => {
    const cmdMap = {
        '1': { 'forward': 'm1f', 'backward': 'm1b', 'stop': 'm1s' },
        '2': { 'forward': 'm2f', 'backward': 'm2b', 'stop': 'm2s' }
    }
    const cmd = cmdMap[id][dir]
    if (await sendBleCommand(cmd)) {
        msgBar.value = `电机${id} 指令: ${dir} 已发送`
    }
}
</script>

<template>
  <div class="manta-view">
    <NavBar />
    <div class="manta-content">
        <div id="app" class="card">
            <header>
                <h1>智能 RGB 控制器</h1>
                <div id="connection-badge" class="badge" :style="badgeStyle">{{ badgeText }}</div>
                <button 
                    id="ble-connect-btn" 
                    class="primary-btn connect-btn" 
                    :disabled="isConnected"
                    @click="connectBle"
                >
                    {{ bleBtnText }}
                </button>
            </header>

            <section class="control-panel">
                <div class="picker-wrapper">
                    <input type="color" id="rgb-picker" v-model="rgbPicker" @input="updateRgbValues">
                    <div class="picker-glare"></div>
                </div>

                <div class="stats">
                    <div class="stat-item">
                        <span class="label">当前 R:</span>
                        <span id="val-r" class="value">{{ valR }}</span>
                    </div>
                    <div class="stat-item">
                        <span class="label">当前 G:</span>
                        <span id="val-g" class="value">{{ valG }}</span>
                    </div>
                    <div class="stat-item">
                        <span class="label">当前 B:</span>
                        <span id="val-b" class="value">{{ valB }}</span>
                    </div>
                </div>

                <button id="sync-btn" class="primary-btn" @click="syncRgb">
                    <span class="btn-text">同步至硬件</span>
                    <div class="loader"></div>
                </button>

                <div class="motor-controls">
                    <h3>电机控制</h3>
                    <div style="margin-bottom: 20px;">
                        <label for="speed-slider" style="display: block; margin-bottom: 5px;">电机速度 (Delay): <span id="speed-val">{{ speedVal }}</span>ms</label>
                        <input type="range" id="speed-slider" min="10" max="100" v-model="speedVal" @change="updateSpeed" style="width: 100%;">
                        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #666;">
                            <span>快 (10ms)</span>
                            <span>慢 (100ms)</span>
                        </div>
                    </div>

                    <h3>电机 1 控制</h3>
                    <div class="btn-group">
                        <button class="motor-btn" @click="motorAction(1, 'forward')">前进</button>
                        <button class="motor-btn danger" @click="motorAction(1, 'stop')">停止</button>
                        <button class="motor-btn" @click="motorAction(1, 'backward')">后退</button>
                    </div>
                    <h3 style="margin-top:1.5rem">电机 2 控制</h3>
                    <div class="btn-group">
                        <button class="motor-btn" @click="motorAction(2, 'forward')">前进</button>
                        <button class="motor-btn danger" @click="motorAction(2, 'stop')">停止</button>
                        <button class="motor-btn" @click="motorAction(2, 'backward')">后退</button>
                    </div>
                </div>
            </section>

            <footer>
                <p id="msg-bar">{{ msgBar }}</p>
            </footer>
        </div>
    </div>
  </div>
</template>

<style scoped>
.manta-view {
    min-height: 100vh;
    background-color: #eceef5;
}

.manta-content {
    padding-top: 80px; /* Adjust for NavBar height */
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 40px;
}

:root {
    --primary: #4361ee;
    --primary-dark: #3730a3;
    --bg: #eceef5;
    --card: #ffffff;
    --text: #1f2937;
    --success: #10b981;
    --error: #ef4444;
}

.card {
    background: #ffffff;
    width: 90%;
    max-width: 420px;
    padding: 2.5rem;
    border-radius: 2rem;
    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
}

header h1 { margin: 0; font-size: 1.6rem; letter-spacing: -0.5px; color: #1f2937; }

.badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    background: #f1f5f9;
    border-radius: 2rem;
    margin-top: 0.5rem;
}

.connect-btn {
    margin-top: 5px; 
    padding: 10px; 
    background: #6366f1;
    font-size: 0.9rem !important;
}

.control-panel { margin: 2rem 0; }

.picker-wrapper {
    position: relative;
    width: 160px;
    height: 160px;
    margin: 0 auto 2rem;
}

input[type=color] {
    appearance: none; -webkit-appearance: none;
    border: none; width: 100%; height: 100%; cursor: pointer;
    background: none; border-radius: 50%;
}

input[type=color]::-webkit-color-swatch-wrapper { padding: 0; }
input[type=color]::-webkit-color-swatch {
    border: 10px solid #f8fafc;
    border-radius: 50%;
    box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
}

.stats {
    display: flex;
    justify-content: space-around;
    margin-bottom: 2rem;
    background: #f8fafc;
    padding: 1rem;
    border-radius: 1rem;
}

.stat-item { display: flex; flex-direction: column; }
.stat-item .label { font-size: 0.7rem; color: #64748b; margin-bottom: 0.25rem; }
.stat-item .value { font-weight: 700; font-family: monospace; color: #1f2937; }

.primary-btn {
    width: 100%;
    padding: 1.2rem;
    background: #4361ee;
    color: white;
    border: none;
    border-radius: 1rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

.primary-btn:hover:not(:disabled) { background: #3730a3; transform: translateY(-2px); }
.primary-btn:active:not(:disabled) { transform: translateY(0); }
.primary-btn:disabled { opacity: 0.7; cursor: not-allowed; }

#msg-bar { font-size: 0.85rem; color: #64748b; margin-top: 1rem; }

.motor-controls {
    margin-top: 2.5rem;
    padding-top: 1.5rem;
    border-top: 1px dashed #e2e8f0;
}
.motor-controls h3 { font-size: 1rem; margin-bottom: 1rem; color: #475569; text-align: center; }
.btn-group { display: flex; gap: 0.5rem; }
.motor-btn {
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #e2e8f0;
    background: white;
    border-radius: 0.75rem;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}
.motor-btn.danger { color: #ef4444; border-color: #fee2e2; }
.motor-btn:active { background: #f8fafc; transform: scale(0.95); }
.motor-btn.danger:active { background: #fef2f2; }
</style>
