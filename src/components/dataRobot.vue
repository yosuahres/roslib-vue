<template>
  <div class="basis-1/3">
    <div class="p-5">
      <p><strong> STATUS : DISCONNECT</strong></p>
      <p>IP LAPTOP: 192.168.1.1</p>
      <p>Status : 1</p>
      <br />
      <p class="text-green-600"><strong>POSISI</strong></p>
      <div class="px-5">
        <p>Posisi X : 999</p>
        <p>Posisi Y : 999</p>
        <p>Posisi Theta : 999</p>
      </div>
      <br />
      <p class="text-green-600"><strong>BOLA</strong></p>
      <div class="px-5">
        <p>Bola X : 999</p>
        <p>Bola Y : 999</p>
      </div>
      <br />
      <p class="text-green-600"><strong>KECEPATAN</strong></p>
      <div class="px-5">
        <p>Kecepatan X : 999</p>
        <p>Kecepatan Y : 999</p>
        <p>Kecepatan Theta : 999</p>
      </div>
      <br />
      <p class="text-green-600"><strong>POSISI</strong></p>
      <div class="px-5">
        <p>X Tujuan : 0</p>
        <p>Y Tujuan : 0</p>
      </div>
    </div>
    <div class="flex flex-wrap">
      <button
        class="flex-1 m-2 p-4 bg-white border border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
      >
        Status 1
      </button>
      <button
        class="flex-1 m-2 p-4 bg-white border border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
      >
        Status 2
      </button>
      <button
        class="flex-1 m-2 p-4 bg-white border border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
      >
        Status 3
      </button>
      <button
        class="flex-1 m-2 p-4 bg-white border border-yellow-500 text-yellow-500 font-semibold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-yellow-500 hover:text-white"
      >
        Status 4
      </button>
    </div>
    <div class="flex flex-col md:flex-row">
      <div
        class="flex-1 m-2 p-4 text-center bg-white border border-green-500 text-green-500 font-semibold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-green-500 hover:text-white"
      >
        PUBLISH!
      </div>
    </div>
  </div>
</template>
