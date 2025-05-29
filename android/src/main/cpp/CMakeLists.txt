cmake_minimum_required(VERSION 3.20)
project(native-primus)

# Set the C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Add the native shared library
add_library(native-primus SHARED NativePrimus.cpp)

# Import the prebuilt shared library (libprimus-zk.so)
add_library(primus-zk SHARED IMPORTED)
set_target_properties(primus-zk PROPERTIES IMPORTED_LOCATION
        ${CMAKE_CURRENT_SOURCE_DIR}/arm64-v8a/lib/libprimus-zk.so)

# If building for arm64-v8a, add special compilation flags
if(${CMAKE_ANDROID_ARCH_ABI} MATCHES "arm64-v8a")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -march=armv8-a+simd+crypto+crc")
endif()

# Find and link necessary Android system libraries
find_library(log-lib log)
find_library(android-lib android)

# Link libraries (order matters)
target_link_libraries(native-primus primus-zk ${log-lib} ${android-lib})

set(CXX_STDLIB "c++_shared")
find_library(cxx_shared-lib ${CXX_STDLIB})

target_link_libraries(native-primus primus-zk ${log-lib} ${android-lib} ${cxx_shared-lib})
