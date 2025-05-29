Pod::Spec.new do |s|
  s.name = "primus-zk"
  s.version = "0.1.0"
  s.summary = "primus-zk core library"
  s.source = { :path => "." }
  s.vendored_frameworks = "primus-zk.xcframework"
  s.requires_arc = true
  s.static_framework = true

  s.authors = "primus"
  s.homepage = "https://github.com/primus-labs"
end
