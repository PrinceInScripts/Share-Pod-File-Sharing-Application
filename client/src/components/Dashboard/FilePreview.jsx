

const FilePreview = ({ file }) => { 
    const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timeout);
      }, []);
    
      if (loading) {
        return (
          <div className="flex items-center justify-center min-h-screen bg-white">
            <h1 className="text-3xl font-bold text-gray-700 animate-pulse">Loading...</h1>
          </div>
        );
      }
    return (
        <h1>File Preview</h1>
    )
}