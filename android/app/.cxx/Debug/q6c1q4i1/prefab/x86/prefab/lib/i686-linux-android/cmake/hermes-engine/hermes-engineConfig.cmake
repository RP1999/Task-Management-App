if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/ranidupromod/.gradle/caches/8.13/transforms/0b4e746a308c8009174132f6c43ff67e/transformed/jetified-hermes-android-0.72.10-debug/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/ranidupromod/.gradle/caches/8.13/transforms/0b4e746a308c8009174132f6c43ff67e/transformed/jetified-hermes-android-0.72.10-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

